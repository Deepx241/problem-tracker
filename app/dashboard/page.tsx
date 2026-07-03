"use client";

import { useEffect, useState } from "react";
import AnalyticsCharts from "@/components/AnalyticsCharts";
import api from "@/lib/api";

interface Problem {
  _id: string;
  title: string;
  platform: string;
  difficulty: string;
  status: string;
  topic: string;
  link?: string;
  notes?: string;
}

interface Analytics {
  total: number;
  solved: number;
  todo: number;
  revision: number;
  easy: number;
  medium: number;
  hard: number;
  platformStats: Record<string, number>;
}

interface Pagination {
  currentPage: number;
  pageSize: number;
  totalProblems: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export default function DashboardPage() {
  const [problems, setProblems] = useState<Problem[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [analytics, setAnalytics] = useState<Analytics>({
    total: 0,
    solved: 0,
    todo: 0,
    revision: 0,
    easy: 0,
    medium: 0,
    hard: 0,
    platformStats: {},
  });

  const [pagination, setPagination] =
    useState<Pagination>({
      currentPage: 1,
      pageSize: 10,
      totalProblems: 0,
      totalPages: 1,
      hasNextPage: false,
      hasPreviousPage: false,
    });

  const [currentPage, setCurrentPage] =
    useState(1);

  const [search, setSearch] = useState("");
  const [difficultyFilter, setDifficultyFilter] =
    useState("");
  const [statusFilter, setStatusFilter] =
    useState("");
  const [platformFilter, setPlatformFilter] =
    useState("");
  const [sort, setSort] = useState("newest");

  const [form, setForm] = useState({
    title: "",
    platform: "LeetCode",
    difficulty: "Easy",
    status: "Todo",
    topic: "",
    link: "",
    notes: "",
  });

  const fetchProblems = async () => {
    try {
      const params = new URLSearchParams();

      params.append(
        "page",
        currentPage.toString()
      );

      params.append("limit", "10");

      if (search)
        params.append("search", search);

      if (difficultyFilter)
        params.append(
          "difficulty",
          difficultyFilter
        );

      if (statusFilter)
        params.append(
          "status",
          statusFilter
        );

      if (platformFilter)
        params.append(
          "platform",
          platformFilter
        );

      if (sort)
        params.append("sort", sort);

      const res = await api.get(
        `/problems?${params.toString()}`
      );

      setProblems(res.data.problems);
      setPagination(res.data.pagination);
    } catch (err) {
      console.error(
        "Failed to fetch problems:",
        err
      );
    }
  };

  const fetchAnalytics = async () => {
    try {
      const res = await api.get(
        "/problems/analytics"
      );
      setAnalytics(res.data);
    } catch (err) {
      console.error(
        "Failed to fetch analytics:",
        err
      );
    }
  };

  useEffect(() => {
    fetchProblems();
    fetchAnalytics();
  }, [
    currentPage,
    search,
    difficultyFilter,
    statusFilter,
    platformFilter,
    sort,
  ]);

  useEffect(() => {
    setCurrentPage(1);
  }, [
    search,
    difficultyFilter,
    statusFilter,
    platformFilter,
    sort,
  ]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement
    >
  ) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const submitProblem = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      if (editingId) {
        await api.put(
          `/problems/${editingId}`,
          form
        );
      } else {
        await api.post(
          "/problems",
          form
        );
      }

      setEditingId(null);

      setForm({
        title: "",
        platform: "LeetCode",
        difficulty: "Easy",
        status: "Todo",
        topic: "",
        link: "",
        notes: "",
      });

      fetchProblems();
      fetchAnalytics();
    } catch (err) {
      console.error(
        "Failed to save problem:",
        err
      );
    }
  };

  const deleteProblem = async (
    id: string
  ) => {
    if (
      !confirm("Delete this problem?")
    )
      return;

    try {
      await api.delete(
        `/problems/${id}`
      );

      fetchProblems();
      fetchAnalytics();
    } catch (err) {
      console.error(
        "Failed to delete problem:",
        err
      );
    }
  };

  const editProblem = (
    problem: Problem
  ) => {
    setEditingId(problem._id);

    setForm({
      title: problem.title,
      platform: problem.platform,
      difficulty: problem.difficulty,
      status: problem.status,
      topic: problem.topic,
      link: problem.link || "",
      notes: problem.notes || "",
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  





return (
  <main className="min-h-screen bg-gradient-to-br from-black via-gray-950 to-black text-white p-8">
    <div className="max-w-7xl mx-auto">

      <h1 className="text-5xl font-extrabold text-center mb-10 bg-gradient-to-r from-blue-500 via-cyan-400 to-purple-500 bg-clip-text text-transparent">
        🚀 Problem Tracker
      </h1>

      {/* Analytics Cards */}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-10">

        <div className="rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 p-5 shadow-xl">
          <p className="text-sm text-gray-100">Total Problems</p>
          <h2 className="text-3xl font-bold mt-2">
            {analytics.total}
          </h2>
        </div>

        <div className="rounded-2xl bg-gradient-to-r from-green-500 to-emerald-600 p-5 shadow-xl">
          <p className="text-sm text-gray-100">Solved</p>
          <h2 className="text-3xl font-bold mt-2">
            {analytics.solved}
          </h2>
        </div>

        <div className="rounded-2xl bg-gradient-to-r from-yellow-500 to-orange-500 p-5 shadow-xl">
          <p className="text-sm text-gray-100">Todo</p>
          <h2 className="text-3xl font-bold mt-2">
            {analytics.todo}
          </h2>
        </div>

        <div className="rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 p-5 shadow-xl">
          <p className="text-sm text-gray-100">Revision</p>
          <h2 className="text-3xl font-bold mt-2">
            {analytics.revision}
          </h2>
        </div>

      </div>

      <AnalyticsCharts analytics={analytics} />

      <div className="grid md:grid-cols-5 gap-4 mb-8">

        <input
          placeholder="🔍 Search problems..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-gray-900 border border-gray-700 rounded-xl p-3 focus:outline-none focus:border-blue-500"
        />

        <select
          value={platformFilter}
          onChange={(e) => setPlatformFilter(e.target.value)}
          className="bg-gray-900 border border-gray-700 rounded-xl p-3"
        >
          <option value="">All Platforms</option>
          <option>LeetCode</option>
          <option>Codeforces</option>
          <option>CodeChef</option>
          <option>AtCoder</option>
          <option>Other</option>
        </select>

        <select
          value={difficultyFilter}
          onChange={(e) => setDifficultyFilter(e.target.value)}
          className="bg-gray-900 border border-gray-700 rounded-xl p-3"
        >
          <option value="">All Difficulty</option>
          <option>Easy</option>
          <option>Medium</option>
          <option>Hard</option>
        </select>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="bg-gray-900 border border-gray-700 rounded-xl p-3"
        >
          <option value="">All Status</option>
          <option>Solved</option>
          <option>Todo</option>
          <option>Revision</option>
        </select>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="bg-gray-900 border border-gray-700 rounded-xl p-3"
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="title">Title A-Z</option>
        </select>

      </div>

      <form
        onSubmit={submitProblem}
        className="grid grid-cols-1 md:grid-cols-2 gap-5 bg-gray-900/70 backdrop-blur-lg border border-gray-700 rounded-2xl p-6 shadow-2xl mb-10"
      >

        <input
          name="title"
          placeholder="Problem Title"
          value={form.title}
          onChange={handleChange}
          required
          className="bg-gray-800 border border-gray-700 rounded-xl p-3"
        />

        <input
          name="topic"
          placeholder="Topic"
          value={form.topic}
          onChange={handleChange}
          required
          className="bg-gray-800 border border-gray-700 rounded-xl p-3"
        />

        <select
          name="platform"
          value={form.platform}
          onChange={handleChange}
          className="bg-gray-800 border border-gray-700 rounded-xl p-3"
        >
          <option>LeetCode</option>
          <option>Codeforces</option>
          <option>CodeChef</option>
          <option>AtCoder</option>
          <option>Other</option>
        </select>

        <select
          name="difficulty"
          value={form.difficulty}
          onChange={handleChange}
          className="bg-gray-800 border border-gray-700 rounded-xl p-3"
        >
          <option>Easy</option>
          <option>Medium</option>
          <option>Hard</option>
        </select>

        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="bg-gray-800 border border-gray-700 rounded-xl p-3"
        >
          <option>Todo</option>
          <option>Solved</option>
          <option>Revision</option>
        </select>

        <button
          type="submit"
          className={`rounded-xl text-white font-bold shadow-xl transition hover:scale-105 ${
            editingId
              ? "bg-green-600 hover:bg-green-700"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {editingId ? "Update Problem" : "Add Problem"}
        </button>

      </form>

      <div className="overflow-x-auto rounded-2xl border border-gray-800 shadow-2xl">

        <table className="w-full">

          <thead>

            <tr className="bg-gray-900 text-gray-300">

              <th className="p-4 text-left">Title</th>
              <th className="p-4 text-left">Platform</th>
              <th className="p-4 text-left">Difficulty</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Topic</th>
              <th className="p-4 text-center">Actions</th>

            </tr>

          </thead>












<tbody>

  {problems.length === 0 ? (

    <tr>

      <td
        colSpan={6}
        className="py-12 text-center text-gray-500 text-lg"
      >
        🚀 No matching problems found.
      </td>

    </tr>

  ) : (

    problems.map((problem) => (

      <tr
        key={problem._id}
        className="border-t border-gray-800 hover:bg-gray-900/70 transition-all duration-300"
      >

        <td className="p-4 font-medium">
          {problem.title}
        </td>

        <td className="p-4">
          <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-sm">
            {problem.platform}
          </span>
        </td>

        <td className="p-4">
          <span
            className={`px-3 py-1 rounded-full text-sm font-semibold ${
              problem.difficulty === "Easy"
                ? "bg-green-500/20 text-green-400"
                : problem.difficulty === "Medium"
                ? "bg-yellow-500/20 text-yellow-300"
                : "bg-red-500/20 text-red-400"
            }`}
          >
            {problem.difficulty}
          </span>
        </td>

        <td className="p-4">
          <span
            className={`px-3 py-1 rounded-full text-sm font-semibold ${
              problem.status === "Solved"
                ? "bg-green-500/20 text-green-400"
                : problem.status === "Todo"
                ? "bg-orange-500/20 text-orange-300"
                : "bg-purple-500/20 text-purple-300"
            }`}
          >
            {problem.status}
          </span>
        </td>

        <td className="p-4">
          {problem.topic}
        </td>

        <td className="p-4">

          <div className="flex justify-center gap-3">

            <button
              onClick={() => editProblem(problem)}
              className="bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded-lg font-semibold transition"
            >
              ✏️ Edit
            </button>

            <button
              onClick={() => deleteProblem(problem._id)}
              className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg font-semibold transition"
            >
              🗑 Delete
            </button>

          </div>

        </td>

      </tr>

    ))

  )}

</tbody>

</table>

</div>

{/* Pagination */}

<div className="flex flex-col md:flex-row items-center justify-between gap-4 mt-8">

  <p className="text-gray-400 text-sm">
    Showing page{" "}
    <span className="font-semibold text-white">
      {pagination.currentPage}
    </span>{" "}
    of{" "}
    <span className="font-semibold text-white">
      {pagination.totalPages}
    </span>{" "}
    ({pagination.totalProblems} Problems)
  </p>

  <div className="flex items-center gap-3">

    <button
      onClick={() =>
        setCurrentPage((prev) => Math.max(prev - 1, 1))
      }
      disabled={!pagination.hasPreviousPage}
      className="px-5 py-2 rounded-xl bg-gray-800 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
    >
      ← Previous
    </button>

    <span className="px-5 py-2 rounded-xl bg-blue-600 font-semibold">
      {pagination.currentPage}
    </span>

    <button
      onClick={() =>
        setCurrentPage((prev) => prev + 1)
      }
      disabled={!pagination.hasNextPage}
      className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
    >
      Next →
    </button>

  </div>

</div>

</div>

</main>

);
}