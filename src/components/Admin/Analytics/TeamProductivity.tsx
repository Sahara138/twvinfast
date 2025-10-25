export default function TeamProductivity() {
  const teamMembers = [
    { name: "Sarah J.", responses: 45, accuracy: 96, status: "Active" },
    { name: "Michael C.", responses: 41, accuracy: 93, status: "Active" },
    { name: "Alex T.", responses: 38, accuracy: 70, status: "Inactive" },
    { name: "Emily R.", responses: 28, accuracy: 91, status: "Active" },
    { name: "Lisa W.", responses: 17, accuracy: 88, status: "Active" },
    { name: "Sarah J.", responses: 16, accuracy: 92, status: "Active" },
  ];
  return (
    <div className="bg-white w-[99%] md:w-[100%] rounded-lg border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        Team Productivity Comparison
      </h3>
      <p className="text-sm text-gray-500 mb-6">
        Individual performance metrics
      </p>
      <div className="space-y-4">
        {teamMembers.map((member, idx) => (
          <div
            key={idx}
            className="md:flex items-center gap-4 p-4 border border-gray-200 rounded-lg"
          >
            <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-gray-600 font-semibold">
              {member.name.charAt(0)}
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-gray-900">{member.name}</h4>
              <p className="text-sm text-gray-500">
                {member.responses} responses this week
              </p>
            </div>
            <div className="md:flex items-center gap-4 mt-2">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-700">
                  {member.accuracy}% accuracy
                </p>
                <div className="w-48 h-2 bg-gray-200 rounded-full mt-1 mb-3 md:mb-0">
                  <div
                    className="h-full bg-gray-700 rounded-full"
                    style={{ width: `${member.accuracy}%` }}
                  ></div>
                </div>
              </div>
              <span
                className={`px-3 py-1 mb-2 rounded-full text-xs font-medium ${
                  member.status === "Active"
                    ? "bg-gray-900 text-white"
                    : "bg-red-500 text-white"
                }`}
              >
                {member.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
