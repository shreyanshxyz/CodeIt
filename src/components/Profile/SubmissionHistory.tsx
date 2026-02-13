'use client';

import React from 'react';
import Link from 'next/link';
import { FaCheckCircle, FaTimesCircle, FaExclamationTriangle } from 'react-icons/fa';

interface SubmissionHistoryProps {
  submissions: Array<{
    id: string;
    problem_id: string;
    code: string;
    language: string;
    status: 'pending' | 'accepted' | 'rejected' | 'error';
    execution_time_ms: number | null;
    memory_used_mb: number | null;
    test_cases_passed: number | null;
    total_test_cases: number | null;
    error_message: string | null;
    created_at: string;
  }>;
}

interface ProblemMap {
  [key: string]: any;
}

const SubmissionHistory: React.FC<SubmissionHistoryProps> = ({ submissions }) => {
  const [problemMap, setProblemMap] = React.useState<ProblemMap>({});

  React.useEffect(() => {
    const fetchProblemTitles = async () => {
      const uniqueProblemIds = [...new Set(submissions.map(s => s.problem_id))];
      const map: ProblemMap = {};

      await Promise.all(
        uniqueProblemIds.map(async (problemId) => {
          try {
            const response = await fetch(`/api/problems/${problemId}`);
            if (response.ok) {
              const data = await response.json();
              map[problemId] = data.data;
            }
          } catch (error) {
            console.error(`Failed to fetch problem ${problemId}:`, error);
          }
        })
      );

      setProblemMap(map);
    };

    if (submissions.length > 0) {
      fetchProblemTitles();
    }
  }, [submissions]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();

    if (diff < 60000) {
      return 'Just now';
    }
    if (diff < 3600000) {
      return `${Math.floor(diff / 60000)} min ago`;
    }
    if (diff < 86400000) {
      return `${Math.floor(diff / 3600000)} hours ago`;
    }
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'accepted':
        return <FaCheckCircle className="text-green-400" />;
      case 'rejected':
        return <FaTimesCircle className="text-red-400" />;
      case 'error':
        return <FaExclamationTriangle className="text-yellow-400" />;
      default:
        return null;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'accepted':
        return 'Accepted';
      case 'rejected':
        return 'Rejected';
      case 'error':
        return 'Error';
      default:
        return 'Pending';
    }
  };

  return (
    <div className="p-6 bg-dark-layer-2 rounded-lg border border-dark-divide-border">
      <h3 className="text-lg font-semibold text-white mb-4">Recent Submissions</h3>

      {submissions.length === 0 ? (
        <div className="text-center py-8 text-gray-400">
          No submissions yet
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-dark-divide-border">
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Problem
                </th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Time
                </th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-dark-divide-border">
              {submissions.map((submission) => (
                <tr key={submission.id} className="hover:bg-dark-fill-2">
                  <td className="py-3 px-4">
                    <Link
                      href={`/problems/${submission.problem_id}`}
                      className="text-gray-300 hover:text-white font-medium"
                    >
                      {problemMap[submission.problem_id]?.title || 'Unknown Problem'}
                    </Link>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(submission.status)}
                      <span className="text-sm text-gray-400">
                        {getStatusText(submission.status)}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-400">
                    {submission.execution_time_ms
                      ? `${submission.execution_time_ms}ms`
                      : '-'}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-400">
                    {formatDate(submission.created_at)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default SubmissionHistory;
