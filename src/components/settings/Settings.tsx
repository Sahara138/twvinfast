import { useState } from 'react';
import { ArrowLeft, Save, User, Bell, Settings as SettingsIcon, Shield, Eye, EyeOff } from 'lucide-react';
import { Link } from 'react-router';
export default function Settings() {
  const [activeTab, setActiveTab] = useState('profile');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);

  const [profileData, setProfileData] = useState({
    fullName: 'Tom Latham',
    email: 'tommy41@gmail.com',
    phone: '+01 23563 5656',
    timezone: 'Eastern Time (UTC-5)',
    signature: 'Best regards,\nJohn Doe\nSenior Manager\nCompany Inc.\nPhone: (555) 123-4567'
  });

  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    desktopNotifications: true,
    soundNotifications: false,
    weekendNotifications: false,
    urgentOnly: false
  });

  const [preferences, setPreferences] = useState({
    language: 'English',
    emailsPerPage: '08',
    autoSaveDrafts: true,
    readReceipts: false
  });

  const [security, setSecurity] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    twoFactorAuth: true,
    sessionTimeout: '08h',
    loginAlerts: false
  });

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div className="bg-white rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-6">Personal Information</h2>

            <div className="grid grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={profileData.fullName}
                  onChange={(e) => setProfileData({ ...profileData, fullName: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary2 focus:border-transparent outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={profileData.email}
                  onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary2 focus:border-transparent outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={profileData.phone}
                  onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary2 focus:border-transparent outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Timezone
                </label>
                <select
                  value={profileData.timezone}
                  onChange={(e) => setProfileData({ ...profileData, timezone: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary2 focus:border-transparent outline-none transition-all bg-white"
                >
                  <option>Eastern Time (UTC-5)</option>
                  <option>Central Time (UTC-6)</option>
                  <option>Mountain Time (UTC-7)</option>
                  <option>Pacific Time (UTC-8)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Signature
              </label>
              <textarea
                value={profileData.signature}
                onChange={(e) => setProfileData({ ...profileData, signature: e.target.value })}
                rows={6}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary2 focus:border-transparent outline-none transition-all resize-none"
              />
            </div>
          </div>
        );

      case 'notification':
        return (
          <div className="bg-white rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-6">Email Notifications</h2>

            <div className="space-y-5">
              <div className="flex items-start justify-between py-3 border-b border-gray-100">
                <div>
                  <h3 className="font-medium text-gray-900 mb-1">Email Alerts</h3>
                  <p className="text-sm text-gray-500">Receive notifications for new emails</p>
                </div>
                <button
                  onClick={() => setNotifications({ ...notifications, emailAlerts: !notifications.emailAlerts })}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${notifications.emailAlerts ? 'bg-primary2' : 'bg-gray-300'
                    }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${notifications.emailAlerts ? 'translate-x-6' : 'translate-x-1'
                      }`}
                  />
                </button>
              </div>

              <div className="flex items-start justify-between py-3 border-b border-gray-100">
                <div>
                  <h3 className="font-medium text-gray-900 mb-1">Desktop Notifications</h3>
                  <p className="text-sm text-gray-500">Show desktop notifications for new emails</p>
                </div>
                <button
                  onClick={() => setNotifications({ ...notifications, desktopNotifications: !notifications.desktopNotifications })}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${notifications.desktopNotifications ? 'bg-primary2' : 'bg-gray-300'
                    }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${notifications.desktopNotifications ? 'translate-x-6' : 'translate-x-1'
                      }`}
                  />
                </button>
              </div>

              <div className="flex items-start justify-between py-3 border-b border-gray-100">
                <div>
                  <h3 className="font-medium text-gray-900 mb-1">Sound Notifications</h3>
                  <p className="text-sm text-gray-500">Play sound when new emails arrive</p>
                </div>
                <button
                  onClick={() => setNotifications({ ...notifications, soundNotifications: !notifications.soundNotifications })}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${notifications.soundNotifications ? 'bg-primary2' : 'bg-gray-300'
                    }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${notifications.soundNotifications ? 'translate-x-6' : 'translate-x-1'
                      }`}
                  />
                </button>
              </div>

              <div className="flex items-start justify-between py-3 border-b border-gray-100">
                <div>
                  <h3 className="font-medium text-gray-900 mb-1">Weekend Notifications</h3>
                  <p className="text-sm text-gray-500">Receive notifications during weekends</p>
                </div>
                <button
                  onClick={() => setNotifications({ ...notifications, weekendNotifications: !notifications.weekendNotifications })}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${notifications.weekendNotifications ? 'bg-primary2' : 'bg-gray-300'
                    }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${notifications.weekendNotifications ? 'translate-x-6' : 'translate-x-1'
                      }`}
                  />
                </button>
              </div>

              <div className="flex items-start justify-between py-3">
                <div>
                  <h3 className="font-medium text-gray-900 mb-1">Urgent Only</h3>
                  <p className="text-sm text-gray-500">Only notify for urgent emails</p>
                </div>
                <button
                  onClick={() => setNotifications({ ...notifications, urgentOnly: !notifications.urgentOnly })}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${notifications.urgentOnly ? 'bg-primary2' : 'bg-gray-300'
                    }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${notifications.urgentOnly ? 'translate-x-6' : 'translate-x-1'
                      }`}
                  />
                </button>
              </div>
            </div>
          </div>
        );

      case 'preference':
        return (
          <div className="bg-white rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-6">Display & Behavior</h2>

            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Language
                  </label>
                  <select
                    value={preferences.language}
                    onChange={(e) => setPreferences({ ...preferences, language: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary2 focus:border-transparent outline-none transition-all bg-white"
                  >
                    <option>English</option>
                    <option>Spanish</option>
                    <option>French</option>
                    <option>German</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Emails per page
                  </label>
                  <select
                    value={preferences.emailsPerPage}
                    onChange={(e) => setPreferences({ ...preferences, emailsPerPage: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary2 focus:border-transparent outline-none transition-all bg-white"
                  >
                    <option value="08">08</option>
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="50">50</option>
                  </select>
                </div>
              </div>

              <div className="flex items-start justify-between py-3 border-b border-gray-100">
                <div>
                  <h3 className="font-medium text-gray-900 mb-1">Auto-save drafts</h3>
                  <p className="text-sm text-gray-500">Automatically save email drafts while composing</p>
                </div>
                <button
                  onClick={() => setPreferences({ ...preferences, autoSaveDrafts: !preferences.autoSaveDrafts })}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${preferences.autoSaveDrafts ? 'bg-primary2' : 'bg-gray-300'
                    }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${preferences.autoSaveDrafts ? 'translate-x-6' : 'translate-x-1'
                      }`}
                  />
                </button>
              </div>

              <div className="flex items-start justify-between py-3">
                <div>
                  <h3 className="font-medium text-gray-900 mb-1">Read receipts</h3>
                  <p className="text-sm text-gray-500">Send read receipts when requested</p>
                </div>
                <button
                  onClick={() => setPreferences({ ...preferences, readReceipts: !preferences.readReceipts })}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${preferences.readReceipts ? 'bg-primary2' : 'bg-gray-300'
                    }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${preferences.readReceipts ? 'translate-x-6' : 'translate-x-1'
                      }`}
                  />
                </button>
              </div>
            </div>
          </div>
        );

      case 'security':
        return (
          <div className="bg-white rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-6">Password & Security</h2>

            <div className="space-y-6 mb-8">
              <h3 className="font-medium text-gray-900">Change Password</h3>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current Password
                </label>
                <div className="relative">
                  <input
                    type={showCurrentPassword ? 'text' : 'password'}
                    value={security.currentPassword}
                    onChange={(e) => setSecurity({ ...security, currentPassword: e.target.value })}
                    placeholder="Eastern Time (UTC-5)"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary2 focus:border-transparent outline-none transition-all pr-10"
                  />
                  <button
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showCurrentPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    New Password
                  </label>
                  <input
                    type="password"
                    value={security.newPassword}
                    onChange={(e) => setSecurity({ ...security, newPassword: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary2 focus:border-transparent outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    value={security.confirmPassword}
                    onChange={(e) => setSecurity({ ...security, confirmPassword: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary2 focus:border-transparent outline-none transition-all"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-5">
              <div className="flex items-start justify-between py-3 border-b border-gray-100">
                <div>
                  <h3 className="font-medium text-gray-900 mb-1">Two-Factor Authentication</h3>
                  <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
                </div>
                <button
                  onClick={() => setSecurity({ ...security, twoFactorAuth: !security.twoFactorAuth })}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${security.twoFactorAuth ? 'bg-primary2' : 'bg-gray-300'
                    }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${security.twoFactorAuth ? 'translate-x-6' : 'translate-x-1'
                      }`}
                  />
                </button>
              </div>

              <div className="flex items-start justify-between py-3 border-b border-gray-100">
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900 mb-1">Session timeout (hours)</h3>
                  <p className="text-sm text-gray-500">Select your Session timeout (hours)</p>
                </div>
                <select
                  value={security.sessionTimeout}
                  onChange={(e) => setSecurity({ ...security, sessionTimeout: e.target.value })}
                  className="ml-4 px-3 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary2 focus:border-transparent outline-none transition-all bg-white text-sm"
                >
                  <option value="01h">01h</option>
                  <option value="02h">02h</option>
                  <option value="04h">04h</option>
                  <option value="08h">08h</option>
                  <option value="12h">12h</option>
                  <option value="24h">24h</option>
                </select>
              </div>

              <div className="flex items-start justify-between py-3">
                <div>
                  <h3 className="font-medium text-gray-900 mb-1">Login alerts</h3>
                  <p className="text-sm text-gray-500">Get notified of new login attempts</p>
                </div>
                <button
                  onClick={() => setSecurity({ ...security, loginAlerts: !security.loginAlerts })}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${security.loginAlerts ? 'bg-primary2' : 'bg-gray-300'
                    }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${security.loginAlerts ? 'translate-x-6' : 'translate-x-1'
                      }`}
                  />
                </button>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="">
      <header className="bg-white h-22 sticky top-0 z-10 px-6  border-b border-gray-200">
        <div className="flex items-center justify-between py-6">
          <div className="flex items-center gap-3">
            <Link to={'/user'} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <ArrowLeft size={20} />
            </Link>
            <h1 className="text-xl font-semibold text-gray-900">Settings</h1>
          </div>

          <button className="flex items-center gap-2 bg-primary2 hover:bg-orange-600 text-white px-4 py-2.5 rounded-lg transition-colors font-medium">
            <Save size={18} />
            Save Changes
          </button>
        </div>
      </header>


      <div className="p-10">


        <div className="flex gap-2 mb-6 ">
          <button
            onClick={() => setActiveTab('profile')}
            className={`flex items-center gap-2 px-4 py-2.5 font-medium transition-all relative ${activeTab === 'profile'
                ? 'bg-primary2 text-white rounded-lg'
                : 'text-gray-600 hover:text-gray-900 border border-[#DFE3E8] rounded-lg'
              }`}
          >
            <User size={18} />
            Profile
          </button>

          <button
            onClick={() => setActiveTab('notification')}
            className={`flex items-center gap-2 px-4 py-2.5 font-medium transition-all relative ${activeTab === 'notification'
                ? 'bg-primary2 text-white rounded-lg'
                : 'text-gray-600 hover:text-gray-900 border border-[#DFE3E8] rounded-lg'
              }`}
          >
            <Bell size={18} />
            Notification
          </button>

          <button
            onClick={() => setActiveTab('preference')}
            className={`flex items-center gap-2 px-4 py-2.5 font-medium transition-all relative ${activeTab === 'preference'
                ? 'bg-primary2 text-white rounded-lg'
                : 'text-gray-600 hover:text-gray-900 border border-[#DFE3E8] rounded-lg'
              }`}
          >
            <SettingsIcon size={18} />
            Preference
          </button>

          <button
            onClick={() => setActiveTab('security')}
            className={`flex items-center gap-2 px-4 py-2.5 font-medium transition-all relative ${activeTab === 'security'
                ? 'bg-primary2 text-white rounded-lg'
                : 'text-gray-600 hover:text-gray-900 border border-[#DFE3E8] rounded-lg'
              }`}
          >
            <Shield size={18} />
            Security
          </button>
        </div>

        {renderContent()}
      </div>
    </div>
  );
}
