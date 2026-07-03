import Problem from "../models/Problem.js";

export const addProblem = async (req, res) => {
  try {
    const problem = await Problem.create({
      ...req.body,
      user: req.user.id,
    });

    res.status(201).json(problem);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

export const getProblems = async (req, res) => {
  try {
    const {
      search,
      difficulty,
      status,
      platform,
      sort,
      page = 1,
      limit = 10,
    } = req.query;

    const query = {
      user: req.user.id,
    };

    if (search) {
      query.title = {
        $regex: search,
        $options: "i",
      };
    }

    if (difficulty) {
      query.difficulty = difficulty;
    }

    if (status) {
      query.status = status;
    }

    if (platform) {
      query.platform = platform;
    }

    let sortOption = {
      createdAt: -1,
    };

    if (sort === "oldest") {
      sortOption = {
        createdAt: 1,
      };
    }

    if (sort === "title") {
      sortOption = {
        title: 1,
      };
    }

    const currentPage = Number(page);
    const pageLimit = Number(limit);

    const skip = (currentPage - 1) * pageLimit;

    const totalProblems = await Problem.countDocuments(
      query
    );

    const problems = await Problem.find(query)
      .sort(sortOption)
      .skip(skip)
      .limit(pageLimit);

    const totalPages = Math.ceil(
      totalProblems / pageLimit
    );

    res.status(200).json({
      problems,
      pagination: {
        currentPage,
        pageSize: pageLimit,
        totalProblems,
        totalPages,
        hasNextPage:
          currentPage < totalPages,
        hasPreviousPage:
          currentPage > 1,
      },
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

export const updateProblem = async (req, res) => {
  try {
    const problem = await Problem.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user.id,
      },
      req.body,
      {
        new: true,
      }
    );

    if (!problem) {
      return res.status(404).json({
        message: "Problem not found",
      });
    }

    res.json(problem);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};













export const deleteProblem = async (req, res) => {
  try {
    const problem = await Problem.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!problem) {
      return res.status(404).json({
        success: false,
        message: "Problem not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Problem deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const getAnalytics = async (req, res) => {
  try {
    const problems = await Problem.find({
      user: req.user.id,
    });

    const platformStats = {};

    problems.forEach((problem) => {
      platformStats[problem.platform] =
        (platformStats[problem.platform] || 0) + 1;
    });

    const analytics = {
      total: problems.length,

      solved: problems.filter(
        (problem) => problem.status === "Solved"
      ).length,

      todo: problems.filter(
        (problem) => problem.status === "Todo"
      ).length,

      revision: problems.filter(
        (problem) => problem.status === "Revision"
      ).length,

      easy: problems.filter(
        (problem) => problem.difficulty === "Easy"
      ).length,

      medium: problems.filter(
        (problem) => problem.difficulty === "Medium"
      ).length,

      hard: problems.filter(
        (problem) => problem.difficulty === "Hard"
      ).length,

      platformStats,
    };

    res.status(200).json(analytics);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};