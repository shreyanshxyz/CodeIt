import { Pool, PoolClient, QueryResultRow, PoolConfig } from "pg";
import logger from "../utils/logger";
import { DatabaseError } from "../utils/errors";

class DatabaseConnection {
  private pool: Pool;
  private static instance: DatabaseConnection;

  private constructor() {
    this.pool = new Pool(this.getPoolConfig());

    this.pool.on("error", (err) => {
      logger.error("Unexpected error on idle client", { error: err.message });
    });

    this.pool.on("connect", () => {
      logger.debug("New database connection established");
    });
  }

  private getPoolConfig(): PoolConfig {
    // Neon/Production - use DATABASE_URL connection string
    if (process.env.DATABASE_URL) {
      return {
        connectionString: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false },
        min: 1,
        max: 10,
        idleTimeoutMillis: 30000,
        connectionTimeoutMillis: 10000,
      };
    }

    // Local development with Docker
    this.validateLocalEnv();
    return {
      host: process.env.DB_HOST || "localhost",
      port: parseInt(process.env.DB_PORT || "5432"),
      database: process.env.DB_NAME || "codeit",
      user: process.env.DB_USER || "postgres",
      password: process.env.DB_PASSWORD || "postgres",
      min: 2,
      max: 20,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 2000,
    };
  }

  private validateLocalEnv(): void {
    if (process.env.NODE_ENV === "production" && !process.env.DATABASE_URL) {
      const requiredVars = [
        "DB_HOST",
        "DB_PORT",
        "DB_NAME",
        "DB_USER",
        "DB_PASSWORD",
      ];
      const missing = requiredVars.filter((v) => !process.env[v]);
      if (missing.length > 0) {
        throw new Error(
          `Missing required environment variables: ${missing.join(", ")}`,
        );
      }
    }
  }

  public static getInstance(): DatabaseConnection {
    if (!DatabaseConnection.instance) {
      DatabaseConnection.instance = new DatabaseConnection();
    }
    return DatabaseConnection.instance;
  }

  public async query<T extends QueryResultRow = QueryResultRow>(
    text: string,
    values?: unknown[],
  ): Promise<T[]> {
    const start = Date.now();
    try {
      const result = await this.pool.query<T>(text, values);
      const duration = Date.now() - start;

      if (process.env.NODE_ENV !== "production") {
        logger.debug("Executed query", {
          query: text.substring(0, 100),
          duration: `${duration}ms`,
          rows: result.rowCount,
        });
      } else {
        logger.debug("Executed query", {
          duration: `${duration}ms`,
          rows: result.rowCount,
        });
      }

      return result.rows;
    } catch (error) {
      const duration = Date.now() - start;
      if (process.env.NODE_ENV !== "production") {
        logger.error("Database query error", {
          error: error instanceof Error ? error.message : "Unknown error",
          query: text.substring(0, 100),
          duration: `${duration}ms`,
        });
      } else {
        logger.error("Database query error", {
          error: error instanceof Error ? error.message : "Unknown error",
          duration: `${duration}ms`,
        });
      }
      throw new DatabaseError(
        error instanceof Error ? error.message : "Query failed",
      );
    }
  }

  public async queryOne<T extends QueryResultRow = QueryResultRow>(
    text: string,
    values?: unknown[],
  ): Promise<T | null> {
    const rows = await this.query<T>(text, values);
    return rows.length > 0 ? rows[0] : null;
  }

  public async transaction<T>(
    callback: (client: PoolClient) => Promise<T>,
  ): Promise<T> {
    const client = await this.pool.connect();
    try {
      await client.query("BEGIN");
      const result = await callback(client);
      await client.query("COMMIT");
      logger.debug("Transaction committed successfully");
      return result;
    } catch (error) {
      await client.query("ROLLBACK");
      logger.error("Transaction rolled back", {
        error: error instanceof Error ? error.message : "Unknown error",
      });
      throw new DatabaseError(
        error instanceof Error ? error.message : "Transaction failed",
      );
    } finally {
      client.release();
    }
  }

  public async healthCheck(): Promise<boolean> {
    try {
      await this.query("SELECT 1");
      return true;
    } catch {
      return false;
    }
  }

  public async close(): Promise<void> {
    await this.pool.end();
    logger.info("Database connection pool closed");
  }
}

export const db = DatabaseConnection.getInstance();
export default db;
