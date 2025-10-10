import { useState } from "react";
import { CalendarDays, Settings } from "lucide-react";
import ToggleSwitch from "../AdminSettings/ToggleSwitch";
import type { Integration } from "../../../types/Admin/Integrations";
export default function Calendar() {
  const toggleAutoSync = (id: string, type: "calendar" | "internal") => {
    if (type === "calendar") {
      setCalendarIntegrations((integrations) =>
        integrations.map((integration) =>
          integration.id === id
            ? { ...integration, autoSync: !integration.autoSync }
            : integration
        )
      );
    }
  };
  const [calendarIntegrations, setCalendarIntegrations] = useState<
    Integration[]
  >([
    {
      id: "google-calendar",
      name: "Google Calendar",
      description: "Sync meetings and appointments",
      icon: <CalendarDays className="text-[#212B36]" size={32} />,
      status: "connected",
      lastSync: "2 minutes ago",
      autoSync: true,
      syncedCalendars: ["Primary", "Work", "Meetings"],
      showConfigure: true,
    },
    {
      id: "outlook-calendar",
      name: "Outlook Calendar",
      description: "Microsoft Outlook calendar integration",
      icon: <CalendarDays className="text-[#212B36]" size={32} />,
      status: "not-connected",
      autoSync: false,
    },
    {
      id: "ical",
      name: "iCal",
      description: "Apple Calendar synchronization",
      icon: <CalendarDays className="text-[#212B36]" size={32} />,
      status: "not-connected",
      autoSync: false,
    },
  ]);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h2 className="text-lg font-medium text-gray-900 mb-1">
        Calendar Integrations
      </h2>
      <p className="text-sm text-gray-500 mb-6">
        Sync your calendar data to improve AI scheduling capabilities
      </p>

      <div className="space-y-6">
        {calendarIntegrations.map((integration) => (
          <div
            key={integration.id}
            className="border border-gray-200 rounded-lg p-6"
          >
            <div className="flex items-start gap-4 ">
              <div className="flex-shrink-0 pt-1 ">{integration.icon}</div>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between  mb-2">
                  <div>
                    <h3 className="text-lg font-medium text-[#212B36]">
                      {integration.name}
                    </h3>
                    <p className="text-sm text-[#454F5B] mt-1">
                      {integration.description}
                    </p>
                  </div>
                  <span
                    className={`px-3 py-1 text-xs font-medium rounded-full whitespace-nowrap ${
                      integration.status === "connected"
                        ? "bg-[#F9DFB3] "
                        : "bg-gray-100"
                    }`}
                  >
                    {integration.status === "connected"
                      ? "Connected"
                      : "Not Connected"}
                  </span>
                </div>

                {integration.syncedCalendars && (
                  <div className="mb-3 mt-3">
                    <p className=" text-sm text-[#000000] mb-2">
                      Synced Calendars
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {integration.syncedCalendars.map((calendar) => (
                        <span
                          key={calendar}
                          className="px-2 py-1 text-xs  text-gray-700 border border-[#637381] rounded-lg"
                        >
                          {calendar}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {integration.status === "connected" && (
                  <div className="mb-4">
                    <div className="flex items-center  justify-between py-2">
                      <span className="text-sm  text-[#000000]">
                        Enable sync
                      </span>
                      <ToggleSwitch
                        checked={integration.autoSync}
                        onChange={() =>
                          toggleAutoSync(integration.id, "calendar")
                        }
                      />
                    </div>
                  </div>
                )}

                <div className="flex gap-2">
                  {integration.showConfigure && (
                    <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-50 transition-colors">
                      <Settings size={14} />
                      Configure
                    </button>
                  )}
                  <button
                    className={`px-3 py-1.5 mt-3 text-xs font-medium rounded transition-colors ${
                      integration.status === "connected"
                        ? "text-gray-700 bg-white border border-gray-300 hover:bg-gray-50"
                        : "text-white bg-primary hover:bg-orange-600"
                    }`}
                  >
                    {integration.status === "connected"
                      ? "Disconnect"
                      : `Connect ${integration.name}`}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
