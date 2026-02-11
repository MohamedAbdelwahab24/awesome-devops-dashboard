import { useParams, Link } from 'react-router-dom';

export default function RepoDetail() {
  const { username, repo } = useParams();

  return (
    <div className="min-h-screen bg-gray-900 text-white px-4 py-10">
      <div className="max-w-4xl mx-auto">
        <Link
          to="/"
          className="inline-flex items-center text-primary-400 hover:text-primary-300 mb-6"
        >
          ← Back to Dashboard
        </Link>

        <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
          <h1 className="text-2xl font-bold mb-2">Repository Details</h1>
          <p className="text-gray-300">
            <span className="font-semibold">Owner:</span> {username}
          </p>
          <p className="text-gray-300">
            <span className="font-semibold">Repository:</span> {repo}
          </p>

          <p className="text-gray-400 mt-6">
            Detailed metrics view is under construction. You can still access full stats from the dashboard cards.
          </p>
        </div>
      </div>
    </div>
  );
}
