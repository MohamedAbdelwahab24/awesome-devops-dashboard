import { Star, GitFork, Code2, Activity } from 'lucide-react';

export function RepoCard({ repo, onStatsClick, getTrendIcon }) {
  const username = repo.owner?.login || 'MohamedAbdelwahab24';

  return (
    <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-primary-500/50 transition-colors cursor-pointer">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-white mb-1">{repo.name}</h3>
          <p className="text-sm text-gray-400">{repo.description || 'No description'}</p>
        </div>
      </div>

      <div className="flex items-center gap-2 mb-4">
        {getTrendIcon(repo.healthScore)}
        <span className={`text-lg font-bold ${
          repo.healthScore >= 70 ? 'text-green-400' :
          repo.healthScore >= 50 ? 'text-yellow-400' : 'text-red-400'
        }`}>
          {repo.healthScore}%
        </span>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="text-center p-3 bg-gray-700/50 rounded-lg">
          <div className="flex items-center justify-center gap-1 text-gray-400 mb-1">
            <Star className="w-4 h-4" />
          </div>
          <p className="text-xl font-semibold text-white">{repo.stargazers_count || 0}</p>
        </div>

        <div className="text-center p-3 bg-gray-700/50 rounded-lg">
          <div className="flex items-center justify-center gap-1 text-gray-400 mb-1">
            <Code2 className="w-4 h-4" />
          </div>
          <p className="text-xl font-semibold text-white">{repo.language || '-'}</p>
        </div>

        <div className="text-center p-3 bg-gray-700/50 rounded-lg">
          <div className="flex items-center justify-center gap-1 text-gray-400 mb-1">
            <GitFork className="w-4 h-4" />
          </div>
          <p className="text-xl font-semibold text-white">{repo.forks_count || 0}</p>
        </div>
      </div>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onStatsClick(username, repo.name);
        }}
        className="w-full py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
      >
        <Activity className="w-4 h-4" />
        View Statistics
      </button>

      <a
        href={repo.html_url}
        target="_blank"
        rel="noopener noreferrer"
        className="block mt-3 text-center text-sm text-primary-400 hover:text-primary-300"
      >
        View on GitHub →
      </a>
    </div>
  );
}

export function RepoStats({ stats, onClose }) {
  if (!stats) return null;

  const score = stats.healthScore ?? 0;

  return (
    <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-white">Repository Statistics</h2>
        <button
          onClick={onClose}
          className="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded text-sm text-white"
        >
          Close
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Stat label="Health Score" value={`${score}%`} />
        <Stat label="Commits" value={stats.commits ?? 0} />
        <Stat label="Open PRs" value={stats.openPRs ?? 0} />
        <Stat label="Open Issues" value={stats.openIssues ?? 0} />
      </div>
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div className="p-4 bg-gray-700/50 rounded-lg">
      <p className="text-xs text-gray-400 mb-1">{label}</p>
      <p className="text-xl font-semibold text-white">{value}</p>
    </div>
  );
}
