"use client";
import React, { useState, useEffect } from "react";
import { Trash2, Plus, Save, X } from "lucide-react";

const AdminPage = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [data, setData] = useState(null);
    const [activeTab, setActiveTab] = useState("grammar");
    const [loading, setLoading] = useState(true);
    const [showAddModal, setShowAddModal] = useState(false);

    // New Question State
    const [newQuestion, setNewQuestion] = useState({
        type: "multiple-choice",
        question: "",
        options: ["", "", "", ""],
        correctAnswer: "",
    });

    useEffect(() => {
        // Check if already authenticated (optional, could use session/cookie)
        // For now, just rely on local state
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch("/api/admin/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ password }),
            });
            const result = await res.json();
            if (result.success) {
                setIsAuthenticated(true);
                fetchData();
            } else {
                setError(result.message);
            }
        } catch (err) {
            setError("Login failed");
        }
    };

    const fetchData = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/admin/questions");
            const result = await res.json();
            setData(result);
        } catch (err) {
            console.error("Failed to fetch data", err);
        } finally {
            setLoading(false);
        }
    };

    const handleSaveData = async (newData) => {
        try {
            const res = await fetch("/api/admin/questions", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newData),
            });
            if (res.ok) {
                setData(newData);
                alert("Saved successfully!");
            } else {
                alert("Failed to save");
            }
        } catch (err) {
            alert("Error saving data");
        }
    };

    const handleDeleteQuestion = (sectionId, questionId) => {
        if (!confirm("Are you sure you want to delete this question?")) return;

        const newData = { ...data };
        newData[sectionId].questions = newData[sectionId].questions.filter(
            (q) => q.id !== questionId
        );
        handleSaveData(newData);
    };

    const handleAddQuestion = () => {
        const newData = { ...data };
        const section = newData[activeTab];

        // Generate new ID
        const newId =
            section.questions.length > 0
                ? Math.max(...section.questions.map((q) => q.id)) + 1
                : 1;

        const questionToAdd = {
            id: newId,
            ...newQuestion,
            options:
                newQuestion.type === "fill-in-blank"
                    ? newQuestion.options
                    : newQuestion.options.filter((o) => o), // Filter empty options if needed
        };

        newData[activeTab].questions.push(questionToAdd);
        handleSaveData(newData);
        setShowAddModal(false);
        setNewQuestion({
            type: "multiple-choice",
            question: "",
            options: ["", "", "", ""],
            correctAnswer: "",
        });
    };

    if (!isAuthenticated) {
        return (
            <div className="flex items-center justify-center h-screen bg-gray-100 font-[dm_sans]">
                <form
                    onSubmit={handleLogin}
                    className="bg-white p-8 rounded-lg shadow-md w-96"
                >
                    <h1 className="text-2xl font-bold mb-6 text-center">
                        Admin Login
                    </h1>
                    {error && (
                        <p className="text-red-500 mb-4 text-sm text-center">
                            {error}
                        </p>
                    )}
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter Password"
                        className="w-full p-3 border rounded-md mb-4 focus:outline-none focus:border-redy"
                    />
                    <button
                        type="submit"
                        className="w-full bg-redy text-white py-3 rounded-md font-semibold hover:bg-red-700 transition-colors"
                    >
                        Login
                    </button>
                </form>
            </div>
        );
    }

    if (loading || !data) {
        return (
            <div className="flex items-center justify-center h-screen font-[dm_sans]">
                Loading...
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 p-8 font-[dm_sans]">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">
                        Assessment Admin
                    </h1>
                    <button
                        onClick={() => setIsAuthenticated(false)}
                        className="text-redy font-medium cursor-pointer"
                    >
                        Logout
                    </button>
                </div>

                {/* Tabs */}
                <div className="flex gap-4 mb-8 border-b border-gray-200">
                    {Object.keys(data).map((key) => (
                        <button
                            key={key}
                            onClick={() => setActiveTab(key)}
                            className={`pb-4 px-4 font-medium transition-colors relative ${
                                activeTab === key
                                    ? "text-redy"
                                    : "text-gray-500 hover:text-gray-700"
                            }`}
                        >
                            {data[key].title}
                            {activeTab === key && (
                                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-redy" />
                            )}
                        </button>
                    ))}
                </div>

                {/* Content */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold">
                            {data[activeTab].title} Questions
                        </h2>
                        <button
                            onClick={() => setShowAddModal(true)}
                            className="flex items-center gap-2 bg-redy text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors cursor-pointer"
                        >
                            <Plus className="w-4 h-4" /> Add Question
                        </button>
                    </div>

                    <div className="space-y-4">
                        {data[activeTab].questions.map((q) => (
                            <div
                                key={q.id}
                                className="p-4 border border-gray-100 rounded-lg hover:border-gray-200 transition-colors"
                            >
                                <div className="flex justify-between items-start gap-4">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="text-xs font-bold bg-gray-100 px-2 py-1 rounded text-gray-600 uppercase">
                                                {q.type}
                                            </span>
                                            <span className="text-sm text-gray-400">
                                                ID: {q.id}
                                            </span>
                                        </div>
                                        <p className="font-medium text-lg mb-3">
                                            {q.question}
                                        </p>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                            {q.options.map((opt, idx) => (
                                                <div
                                                    key={idx}
                                                    className={`text-sm p-2 rounded ${
                                                        opt === q.correctAnswer
                                                            ? "bg-green-50 text-green-700 border border-green-100"
                                                            : "bg-gray-50 text-gray-600"
                                                    }`}
                                                >
                                                    {opt}{" "}
                                                    {opt === q.correctAnswer &&
                                                        "(Correct)"}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <button
                                        onClick={() =>
                                            handleDeleteQuestion(
                                                activeTab,
                                                q.id
                                            )
                                        }
                                        className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                                        title="Delete Question"
                                    >
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        ))}

                        {data[activeTab].questions.length === 0 && (
                            <p className="text-center text-gray-400 py-8">
                                No questions in this section.
                            </p>
                        )}
                    </div>
                </div>
            </div>

            {/* Add Question Modal */}
            {showAddModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold">
                                Add New Question
                            </h2>
                            <button
                                onClick={() => setShowAddModal(false)}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Question Type
                                </label>
                                <select
                                    value={newQuestion.type}
                                    onChange={(e) =>
                                        setNewQuestion({
                                            ...newQuestion,
                                            type: e.target.value,
                                        })
                                    }
                                    className="w-full p-2 border rounded-md"
                                >
                                    <option value="multiple-choice">
                                        Multiple Choice
                                    </option>
                                    <option value="fill-in-blank">
                                        Fill in the Blank
                                    </option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Question Text
                                </label>
                                <textarea
                                    value={newQuestion.question}
                                    onChange={(e) =>
                                        setNewQuestion({
                                            ...newQuestion,
                                            question: e.target.value,
                                        })
                                    }
                                    className="w-full p-2 border rounded-md"
                                    rows="3"
                                    placeholder="Enter the question..."
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Options
                                </label>
                                {newQuestion.options.map((opt, idx) => (
                                    <input
                                        key={idx}
                                        type="text"
                                        value={opt}
                                        onChange={(e) => {
                                            const newOptions = [
                                                ...newQuestion.options,
                                            ];
                                            newOptions[idx] = e.target.value;
                                            setNewQuestion({
                                                ...newQuestion,
                                                options: newOptions,
                                            });
                                        }}
                                        placeholder={`Option ${idx + 1}`}
                                        className="w-full p-2 border rounded-md mb-2"
                                    />
                                ))}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Correct Answer
                                </label>
                                <select
                                    value={newQuestion.correctAnswer}
                                    onChange={(e) =>
                                        setNewQuestion({
                                            ...newQuestion,
                                            correctAnswer: e.target.value,
                                        })
                                    }
                                    className="w-full p-2 border rounded-md"
                                >
                                    <option value="">
                                        Select correct answer
                                    </option>
                                    {newQuestion.options.map(
                                        (opt, idx) =>
                                            opt && (
                                                <option key={idx} value={opt}>
                                                    {opt}
                                                </option>
                                            )
                                    )}
                                </select>
                            </div>

                            <div className="pt-4 flex justify-end gap-3">
                                <button
                                    onClick={() => setShowAddModal(false)}
                                    className="px-4 py-2 border rounded-md text-gray-600 hover:bg-gray-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleAddQuestion}
                                    disabled={
                                        !newQuestion.question ||
                                        !newQuestion.correctAnswer
                                    }
                                    className="px-4 py-2 bg-redy text-white rounded-md hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Save Question
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminPage;
