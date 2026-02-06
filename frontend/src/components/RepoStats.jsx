import { Close, BarChart3, GitPullRequest, GitIssue, Layers, CheckCircle2 } from 'lucide-react';
import { ActivityChart } from './ActivityChart';

export function RepoStats({ stats, onClose }) {
  const { repo, openPrs, openIssues, deployments, healthScore } = stats;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-gray-800 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-gray-800 border-b border-gray-700 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
              <Layers className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">{repo.name}</h2>
              <p className="text-sm text-gray-400">{repo.owner?.login || 'MohamedAbdelwahab24'}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
          >
            <Close className="w-6 h-6 text-gray-400" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Health Score */}
          <div className="bg-gray-700/50 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-primary-400" />
                Health Score
              </h3>
              <div className={`text-4xl font-bold ${
                healthScore >= 70 ? 'text-green-400' :
                healthScore >= 50 ? 'text-yellow-400' : 'text-red-400'
              }`}>
                {healthScore}%
              </div>
            </div>
            <div className="h-2 bg-gray-600 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-1000 ${
                  healthScore >= 70 ? 'bg-green-500' :
                  healthScore >= 50 ? 'bg-yellow-500' : 'bg-red-500'
                }`}
                style={{ width: `${healthScore}%` }}
              />
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-gray-700/50 rounded-xl p-4">
              <div className="flex items-center gap-2 text-gray-400 mb-2">
                <GitPullRequest className="w-5 h-5" />
                <span className="text-sm font-medium">Open PRs</span>
              </div>
              <p className="text-3xl font-bold text-white">{openPrs}</p>
            </div>

            <div className="bg-gray-700/50 rounded-xl p-4">
              <div className="flex items-center gap-2 text-gray-400 mb-2">
                <GitIssue className="w-5 h-5" />
                <span className="text-sm font-medium">Open Issues</span>
              </div>
              <p className="text-3xl font-bold text-white">{openIssues}</p>
            </div>

            <div className="bg-gray-700/50 rounded-xl p-4">
              <div className="flex items-center gap-2 text-gray-400 mb-2">
                <Star className="w-5 h-5" />
                <span className="text-sm font-medium">Stars</span>
              </div>
              <p className="text-3xl font-bold text-white">{repo.stargazers_count || 0}</p>
            </div>

            <div className="bg-gray-700/50 rounded-xl p-4">
              <div className="flex items-center gap-2 text-gray-400 mb-2">
                <Forks className="w-5 h-5" />
                <span className="text-sm font-medium">Forks</span>
              </div>
              <p className="text-3xl font-bold text-white">{repo.forks_count || 0}</p>
            </div>
          </div>

          {/* Recent Deployments */}
          <div className="bg-gray-700/50 rounded-xl p-4">
            <h3 className="text-lg font-semibold text-white mb-4">Recent Deployments</h3>
            <div className="space-y-3">
              {deployments.slice(0, 5).map((deployment, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className={`w-5 h-5 ${
                      deployment.status === 'success' ? 'text-green-400' :
                      deployment.status === 'pending' ? 'text-yellow-400' : 'text-red-400'
                    }`} />
                    <div>
                      <p className="text-white font-medium">deployment-{index + 1}</p>
                      <p className="text-sm text-gray-400">
                        {new Date(deployment.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    deployment.status === 'success' ? 'bg-green-500/20 text-green-400' :
                    deployment.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-red-500/20 text-red-400'
                  }`}>
                    {deployment.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Activity Chart */}
          <ActivityChart />

          {/* Repository Info */}
          <div className="bg-gray-700/50 rounded-xl p-4">
            <h3 className="text-lg font-semibold text-white mb-4">Repository Information</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-400">Language</span>
                <span className="text-white font-medium">{repo.language || 'Unknown'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Last Updated</span>
                <span className="text-white font-medium">
                  {new Date(repo.updated_at).toLocaleDateString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Created</span>
                <span className="text-white font-medium">
                  {new Date(repo.created_at).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
