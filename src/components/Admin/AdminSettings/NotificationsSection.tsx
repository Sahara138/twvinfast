import { Eye, Trash2 } from "lucide-react";
import ToggleSwitch from "./ToggleSwitch";
import Heading from "../Heading";
import type { NotificationsProps } from "../../../types/Admin/AdminSetting";

const NotificationsSection: React.FC<NotificationsProps> = ({
  notificationRules,
  globalNotifications,
  onRuleToggle,
  onGlobalToggle,
}) => (
  <div className="space-y-8">
    {/* Notification Rules */}
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200 flex items-center justify-between">
        <Heading
          heading1="Notification Rules"
          heading2="Manage your notification preferences"
        />
        <button className="px-4 py-2 bg-primary text-white text-sm font-medium rounded-md hover:bg-orange-600 transition-colors">
          Add Rules
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Rule Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Trigger
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Action
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {notificationRules.map((rule) => (
              <tr key={rule.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {rule.name}
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {rule.description}
                    </p>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-gray-700">{rule.trigger}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-gray-700">{rule.action}</span>
                </td>
                <td className="px-6 py-4">
                  <ToggleSwitch
                    checked={rule.enabled}
                    onChange={() => onRuleToggle(rule.id)}
                  />
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button className="p-1.5 text-gray-400 hover:text-gray-600 transition-colors">
                      <Eye size={18} />
                    </button>
                    <button className="p-1.5 text-gray-400 hover:text-red-600 transition-colors">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>

    {/* Global Notification Settings */}
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <Heading
        heading1="Global Notification Settings"
        heading2="Configure system-wide notification preferences"
      />

      <div className="">
        <div className="space-y-4 mb-6">
          {[
            {
              key: "email" as const,
              label: "Email Notification",
              description: "Send notifications via email",
            },
            {
              key: "push" as const,
              label: "Push Notification",
              description: "Show browser push notifications",
            },
            {
              key: "slack" as const,
              label: "Slack Integration",
              description: "Send alerts to Slack channels",
            },
            {
              key: "sms" as const,
              label: "SMS Alerts",
              description: "Send critical alerts via SMS",
            },
          ].map(({ key, label, description }) => (
            <div key={key} className="flex items-center justify-between py-2">
              <div className="flex-1">
                <p className=" text-lg font-medium text-[#000000]">{label}</p>
                <p className=" text-[#454F5B] mt-0.5">{description}</p>
              </div>
              <ToggleSwitch
                checked={!!globalNotifications[key]}
                onChange={() => onGlobalToggle(key)}
              />
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-4 pt-4 border-t border-gray-200">
          <div className="flex flex-col">
            <label className="label">Admin Email</label>
            <input
              type="email"
              value={globalNotifications.adminEmail}
              readOnly
              className="border border-gray-300 rounded-md px-3 py-2 text-sm bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder="admin@techflow.com"
            />
          </div>
          <div className="flex flex-col">
            <label className="label">Slack Webhook URL</label>
            <input
              type="text"
              value={globalNotifications.slackWebhook}
              readOnly
              className="border border-gray-300 rounded-md px-3 py-2 text-sm bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder="www.slack.com"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default NotificationsSection;
