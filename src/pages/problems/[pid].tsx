'use client';

import Topbar from "@/components/Topbar/Topbar";
import { SplitPaneLayout } from "@/components/ProblemScreen/SplitPaneLayout/SplitPaneLayout";
import useHasMounted from "@/hooks/useHasMounted";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { api } from "@/lib/api/client";

type Problem = {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category?: string;
  description: string;
  starter_code: string;
  starter_function_name: string;
  handler_function: string;
  examples: Array<{
    id: number;
    inputText: string;
    outputText: string;
    explanation?: string;
    img?: string;
  }>;
  constraints: string;
  tags?: string[];
  userProgress?: {
    status: 'not_started' | 'in_progress' | 'solved';
    attempts_count: number;
  };
};

const ProblemPage = () => {
  const params = useParams();
  const pid = params?.pid as string;
  const hasMounted = useHasMounted();
  const [problem, setProblem] = useState<Problem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProblem = async () => {
      if (!pid) return;

      try {
        const response = await api.getProblem(pid);
        if (response.success) {
          setProblem(response.data);
        }
      } catch (error) {
        console.error('Failed to fetch problem:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProblem();
  }, [pid]);

  if (!hasMounted || loading) {
    return (
      <div className="flex flex-col h-screen bg-dark-layer-1">
        <Topbar problemPage />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-gray-500">Loading...</div>
        </div>
      </div>
    );
  }

  if (!problem) {
    return (
      <div className="flex flex-col h-screen bg-dark-layer-1">
        <Topbar problemPage />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-gray-500">Problem not found</div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-dark-layer-1">
      <Topbar problemPage />
      <div className="flex-1 overflow-hidden">
        <SplitPaneLayout problem={problem} />
      </div>
    </div>
  );
};

export default ProblemPage;
