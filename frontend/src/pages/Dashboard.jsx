import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { RepoCard, RepoStats } from '../components/RepoCard';
import { ActivityChart } from '../components/ActivityChart';
import { RepoList } from '../components/RepoList';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

export default function Dashboard() {
  const { user } = useAuth();
  const [repos, setRepos] = useState([]);
  const [selectedRepo, setSelectedRepo] = useState(null);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchRepos();
  }, []);

  const fetchRepos = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:3000/api/repos/user/${user.username}`);
      const data = await response.json();

      if (response.ok) {
        setRepos(data.repos);
      } else {
        throw new Error(data.error || 'Failed to fetch repos');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchRepoStats = async (username, repo) => {
    try {
      const response = await fetch(`http://localhost:3000/api/repos/stats/${username}/${repo}`);
      const data = await response.json();

      if (response.ok) {
        setStats(data);
        setSelectedRepo({ username, repo });
      } else {
        throw new Error(data.error || 'Failed to fetch stats');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const getTrendIcon = (healthScore) => {
    if (healthScore >= 70) return <TrendingUp className="text-green-400" />;
    if (healthScore >= 50) return <Minus className="text-yellow-400" />;
    return <TrendingDown className="text-red-400" />;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-6 text-center">
          <p className="text-red-400">{error}</p>
          <button onClick={fetchRepos} className="mt-4 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-white">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <header className="bg-gray-800 border-b border-gray-700 px-4 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white">DevOps Dashboard</h1>
          <div className="flex items-center gap-4">
            <span className="text-gray-400">{user?.username}</span>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-white text-sm"
            >
              Refresh
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {repos.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-400 text-lg">No repositories found</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {repos.map((repo) => (
                <RepoCard
                  key={repo.id}
                  repo={repo}
                  onStatsClick={() => fetchRepoStats(repo.owner.login || 'MohamedAbdelwahab24', repo.name)}
                  getTrendIcon={getTrendIcon}
                />
              ))}
            </div>

            {selectedRepo && stats && (
              <RepoStats
                stats={stats}
                onClose={() => setSelectedRepo(null)}
              />
            )}
          </>
        )}
      </main>
    </div>
  );
}
