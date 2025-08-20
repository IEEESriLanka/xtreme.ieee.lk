import React, { useState, useEffect } from "react";

const RemainingRanks = () => {
  const remainingTeams = [
    {
      rank: 4,
      globalRank: 83,
      teamName: "KKCoders",
      university: "University of Moratuwa",
    },
    {
      rank: 5,
      globalRank: 84,
      teamName: "Iam",
      university: "University of Moratuwa",
    },
    {
      rank: 6,
      globalRank: 102,
      teamName: "DevDynamos",
      university: "University of Jaffna",
    },
    {
      rank: 7,
      globalRank: 111,
      teamName: "CompCr3w",
      university: "University of Colombo School of Computing",
    },
    {
      rank: 8,
      globalRank: 129,
      teamName: "Helloworld",
      university: "University of Moratuwa",
    },
    {
      rank: 9,
      globalRank: 176,
      teamName: "YamateKudasai",
      university: "KDU - Gen. Sir John Kotelawala Defence University",
    },
    {
      rank: 10,
      globalRank: 181,
      teamName: "Unicorn",
      university: "University of Ruhuna",
    },
    {
      rank: 11,
      globalRank: 191,
      teamName: "TeamGlory",
      university: "Sri Lanka Institute of Information Technology",
    },
    {
      rank: 12,
      globalRank: 246,
      teamName: "TokyoDrift",
      university: "University of Ruhuna",
    },
    {
      rank: 13,
      globalRank: 255,
      teamName: "TeamVertex",
      university: "University Of Kelaniya",
    },
  ];

  const getRankSuffix = (rank) => {
    const lastDigit = rank % 10;
    const lastTwoDigits = rank % 100;

    if (lastTwoDigits >= 11 && lastTwoDigits <= 13) return "th";
    if (lastDigit === 1) return "st";
    if (lastDigit === 2) return "nd";
    if (lastDigit === 3) return "rd";
    return "th";
  };

  return (
    <div className="mt-16 relative">
      {/* Section divider */}
      <div className="flex items-center justify-center mb-12">
        <div className="flex-grow h-px bg-gradient-to-r from-transparent via-blue-300 to-blue-400 animate-pulse"></div>
        <div className="px-8 py-3 bg-gradient-to-r from-blue-600 via-blue-600 to-blue-500 rounded-full shadow-lg relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 via-blue-400/20 to-blue-400/20 animate-pulse"></div>
          <span className="text-white font-bold text-sm relative z-10 flex items-center gap-2">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            Top Performers • IEEEXtreme Sri Lanka
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </span>
        </div>
        <div className="flex-grow h-px bg-gradient-to-r from-blue-400 via-blue-300 to-transparent animate-pulse"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {remainingTeams.map((team, index) => (
          <div
            key={team.rank}
            className="group bg-white rounded-xl border border-gray-200 shadow-md hover:shadow-2xl transform hover:scale-[1.03] hover:-translate-y-3 transition-all duration-500 overflow-hidden relative"
          >
            {/* Glowing border effect on hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-blue-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"></div>

            {/* Animated background pattern */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-blue-200/40 to-blue-200/30 rounded-full -translate-y-12 translate-x-12 group-hover:scale-150 group-hover:rotate-45 transition-all duration-700"></div>
            <div className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tr from-blue-200/30 to-blue-200/40 rounded-full translate-y-10 -translate-x-10 group-hover:scale-125 group-hover:-rotate-45 transition-all duration-700"></div>

            {/* Floating particles effect */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
              <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400/60 rounded-full animate-ping"></div>
              <div className="absolute top-3/4 right-1/4 w-1.5 h-1.5 bg-blue-400/60 rounded-full animate-pulse"></div>
              <div className="absolute bottom-1/4 left-3/4 w-1 h-1 bg-blue-400/60 rounded-full animate-bounce"></div>
            </div>

            {/* Header with ranks */}
            <div className="bg-gradient-to-r from-slate-50 via-blue-50 to-blue-50 px-4 py-3 border-b border-gray-100 relative z-10 group-hover:from-blue-100 group-hover:to-blue-100 transition-all duration-500">
              <div className="flex justify-between items-center">
                {/* Local rank - prominent */}
                <div className="flex items-center gap-2">
                  <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-3 py-1.5 rounded-full text-sm font-bold shadow-md group-hover:shadow-xl group-hover:from-blue-500 group-hover:to-blue-600 transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                    #{team.rank}
                  </div>
                  <span className="text-blue-800 font-semibold text-xs tracking-wide group-hover:text-blue-900 transition-colors duration-300">
                    SRI LANKA
                  </span>
                </div>

                {/* Global rank - secondary but clear */}
                <div className="flex items-center gap-2">
                  <span className="text-gray-500 text-xs font-medium group-hover:text-gray-600 transition-colors duration-300">
                    GLOBAL
                  </span>
                  <div className="bg-gradient-to-r from-gray-600 to-gray-700 text-white px-2.5 py-1 rounded-md text-sm font-medium shadow-sm group-hover:shadow-lg group-hover:from-gray-500 group-hover:to-gray-600 group-hover:scale-105 transition-all duration-300">
                    #{team.globalRank}
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 relative z-10">
              <div className="text-center mb-4">
                <h4 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-blue-700 group-hover:scale-105 transition-all duration-300">
                  {team.teamName}
                </h4>
                <div className="w-12 h-0.5 bg-gradient-to-r from-blue-500 to-blue-500 mx-auto rounded-full group-hover:w-24 group-hover:from-blue-500 group-hover:via-blue-500 group-hover:to-blue-500 transition-all duration-500"></div>
              </div>

              <div className="flex items-start gap-2 mb-4 bg-gray-50/50 rounded-lg p-3 group-hover:bg-gradient-to-r group-hover:from-blue-50/70 group-hover:to-blue-50/70 group-hover:shadow-inner transition-all duration-500">
                <svg
                  className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0 group-hover:text-blue-600 group-hover:scale-110 transition-all duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
                <span className="text-gray-700 text-sm leading-tight group-hover:text-gray-800 transition-colors duration-300">
                  {team.university}
                </span>
              </div>

              {/* Position summary with achievement styling */}
              <div className="text-center pt-3 border-t border-gray-100 group-hover:border-blue-200 transition-colors duration-300">
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-50 to-blue-50 px-4 py-2 rounded-full group-hover:from-blue-100 group-hover:to-blue-100 group-hover:shadow-lg group-hover:scale-105 transition-all duration-300">
                  <svg
                    className="w-3 h-3 text-yellow-500 group-hover:text-yellow-400 group-hover:scale-125 transition-all duration-300"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="text-blue-700 text-sm font-semibold tracking-wide group-hover:text-blue-800 transition-colors duration-300">
                    {team.rank}
                    {getRankSuffix(team.rank)} PLACE
                  </span>
                  <svg
                    className="w-3 h-3 text-yellow-500 group-hover:text-yellow-400 group-hover:scale-125 transition-all duration-300"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="absolute top-3 right-3 text-blue-300/40 text-lg font-mono opacity-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:rotate-12 group-hover:scale-125">
              &lt;/&gt;
            </div>
            <div className="absolute bottom-3 left-3 text-blue-300/50 text-base font-mono opacity-0 group-hover:opacity-100 transition-all duration-700 transform group-hover:-rotate-12 group-hover:scale-110">
              {}
            </div>
            <div className="absolute top-1/2 right-2 text-blue-300/30 text-sm font-mono opacity-0 group-hover:opacity-100 transition-all duration-600 transform group-hover:rotate-45">
              [ ]
            </div>

            {/* Glowing border line effect */}
            <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <div className="absolute inset-0 rounded-xl border-2 border-gradient-to-r from-transparent via-blue-400/50 to-transparent animate-pulse"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RemainingRanks;
