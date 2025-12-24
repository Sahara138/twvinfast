import { useEffect, useState } from 'react';
import { ArrowLeft, Save, User, Bell, Settings as SettingsIcon, Shield, Eye, EyeOff, RotateCcwKey } from 'lucide-react';
import { Link } from 'react-router';
import { useChangePasswordMutation, useGetUsersProfileQuery, useUpdateCredentialsMutation, useUpdateNotificationMutation, useUpdateUsersProfileMutation } from '../../redux/featuresAPI/auth/auth.api';
import { toast } from 'react-toastify';
import type { UpdateCredentialsPayload } from '../../redux/user.type';
export default function Settings() {
  const [activeTab, setActiveTab] = useState('profile');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);

  const [changePassword, { isLoading: isChanging }] =
  useChangePasswordMutation();
  const { data: user, isLoading } = useGetUsersProfileQuery();
  const [updateNotification, { isLoading: isUpdatingNotification }] =
  useUpdateNotificationMutation();
  const [updateCredentials, { isLoading: isUpdating }] =
  useUpdateCredentialsMutation();
  const [updateUsersProfile,{isLoading: isUpdatingProfile}] = useUpdateUsersProfileMutation();

  console.log(user)
  const [profileData, setProfileData] = useState({
    fullName: user?.name,
    email: user?.email,
    phone: user?.phone,
    location: user?.location,
    signature: user?.email_signature,
  });

  const [notifications, setNotifications] = useState({
    emailAlerts: user?.notificationSetting?.email_alert_enabled,
    loginAlerts: user?.notificationSetting?.login_alert_enabled,
    // soundNotifications: false,
    // weekendNotifications: false,
    // urgentOnly: false
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
    twoFactorAuth: user?.twoFAEnabled,
    sessionTimeout: '08h',
    loginAlerts: user?.notificationSetting?.login_alert_enabled
  });
const [credentialsData, setCredentialsData] = useState<UpdateCredentialsPayload>({
  provider: '',
  email_address: '',
  smtp_host: '',
  smtp_port: 0,
  smtp_password: '',
  imap_host: '',
  imap_port: 0,
  imap_password: '',
  is_ssl: false,
});

useEffect(() => {
  if (user?.mailboxes?.length) {
    const mailbox = user.mailboxes[0];
    setCredentialsData({
      provider: mailbox.provider || '',
      email_address: mailbox.email_address || '',
      smtp_host: mailbox.smtp_host || '',
      smtp_port: Number(mailbox.smtp_port) || 0, // convert to number
      smtp_password: mailbox.smtp_password || '',
      imap_host: mailbox.imap_host || '',
      imap_port: Number(mailbox.imap_port) || 0, // convert to number
      imap_password: mailbox.imap_password || '',
      is_ssl: mailbox.is_ssl || false,
    });
  }
}, [user]);



  useEffect(() => {
  if (user) {
    setNotifications({
      emailAlerts: user.notificationSetting?.email_alert_enabled ?? false,
      loginAlerts: user.notificationSetting?.login_alert_enabled ?? false,
    });

    setSecurity((prev) => ({
      ...prev,
      loginAlerts: user.notificationSetting?.login_alert_enabled ?? false,
      twoFactorAuth: user.twoFAEnabled,
    }));

    setProfileData({
      fullName: user.name,
      email: user.email,
      phone: user.phone,
      location: user.location,
      signature: user.email_signature,
    });
  }
}, [user]);

  const handleChangePassword = async () => {
  const { currentPassword, newPassword, confirmPassword } = security;

  // Basic validation
  if (!currentPassword || !newPassword || !confirmPassword) {
    toast.error("All password fields are required");
    return;
  }

  if (newPassword !== confirmPassword) {
    toast.error("New password and confirm password do not match");
    return;
  }

  try {
    await changePassword({
      currentPassword,
      newPassword,
      confirmPassword,
    }).unwrap();

    toast.success("Password changed successfully");

    // Clear fields
    setSecurity((prev) => ({
      ...prev,
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    }));
  } catch (error: any) {
    toast.error(error?.data?.message || "Failed to change password");
  }
};
const handleSaveProfile = async () => {
  try {
    await updateUsersProfile({
      name: profileData.fullName,
      phone: profileData.phone,
      location: profileData.location,
      email_signature: profileData.signature,
    }).unwrap();

    toast.success("Profile updated successfully");
  } catch (error: any) {
    toast.error(error?.data?.message || "Failed to update profile");
  }
};

const handleSaveCredentials = async () => {
  try {
    await updateCredentials({
      ...credentialsData,
      smtp_port: Number(credentialsData.smtp_port),
      imap_port: Number(credentialsData.imap_port),
    }).unwrap();

    toast.success("Credentials updated successfully");
  } catch (error: any) {
    toast.error(error?.data?.message || "Failed to update credentials");
  }
};

const handleSaveNotifications = async () => {
  try {
    await updateNotification({
      email_alert_enabled: notifications.emailAlerts,
      login_alert_enabled: notifications.loginAlerts,
    }).unwrap();

    toast.success("Notification settings updated");
  } catch (error: any) {
    toast.error(error?.data?.message || "Failed to update notifications");
  }
};
if (isLoading) {
    // Show loader while data is loading
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <div className="loader"></div>
        <p>Loading...</p>
      </div>
    );
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div className="bg-white rounded-lg p-3 overflow-x-auto">
            <h2 className="text-lg font-semibold mb-6">Personal Information</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
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
                  Location
                </label>
                 <input
                  type="tel"
                  value={profileData.location}
                  onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary2 focus:border-transparent outline-none transition-all"
                />
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
          <div className="bg-white rounded-lg p-3">
            <h2 className="text-base md:text-lg font-semibold mb-6">Email Notifications</h2>

            <div className="space-y-5">
              <div className="flex items-start justify-between py-3 border-b border-gray-100">
                <div className='w-[30%] md:w-[50%]'>
                  <h3 className="font-medium text-gray-900 text-sm md:text-base mb-1">Email Alerts</h3>
                  <p className=" text-xs md:text-sm text-gray-500">Receive notifications for new emails</p>
                </div>
                <button
                  onClick={() => setNotifications({ ...notifications, emailAlerts: !notifications.emailAlerts })}
                  className={`relative inline-flex h-4 w-9 md:h-6 md:w-11 items-center rounded-full transition-colors ${notifications.emailAlerts ? 'bg-primary2' : 'bg-gray-300'
                    }`}
                >
                  <span
                    className={`inline-block h-3 w-3 md:h-4 md:w-4 transform rounded-full bg-white transition-transform ${notifications.emailAlerts ? 'translate-x-6' : 'translate-x-1'
                      }`}
                  />
                </button>
              </div>

              <div className="flex items-start justify-between py-3 ">
                <div className='w-[30%] md:w-[50%]'>
                  <h3 className="font-medium text-gray-900 text-sm md:text-base mb-1">Login Alerts</h3>
                  <p className="text-xs md:text-sm text-gray-500">Receive notifications for new login</p>
                </div>
                <button
                  onClick={() => setNotifications({ ...notifications, loginAlerts: !notifications.loginAlerts })}
                  className={`relative inline-flex h-4 w-9 md:h-6 md:w-11 items-center rounded-full transition-colors ${notifications.loginAlerts ? 'bg-primary2' : 'bg-gray-300'
                    }`}
                >
                  <span
                    className={`inline-block h-3 w-3 md:h-4 md:w-4 transform rounded-full bg-white transition-transform ${notifications.loginAlerts ? 'translate-x-6' : 'translate-x-1'
                      }`}
                  />
                </button>
              </div>

              {/* <div className="flex items-start justify-between py-3 border-b border-gray-100">
                <div className='w-[30%] md:w-[50%]'>
                  <h3 className="font-medium text-gray-900 text-sm md:text-base mb-1">Sound Notifications</h3>
                  <p className="text-xs md:text-sm text-gray-500">Play sound when new emails arrive</p>
                </div>
                <button
                  onClick={() => setNotifications({ ...notifications, soundNotifications: !notifications.soundNotifications })}
                  className={`relative inline-flex h-4 w-9 md:h-6 md:w-11 items-center rounded-full transition-colors ${notifications.soundNotifications ? 'bg-primary2' : 'bg-gray-300'
                    }`}
                >
                  <span
                    className={`inline-block h-3 w-3 md:h-4 md:w-4 transform rounded-full bg-white transition-transform ${notifications.soundNotifications ? 'translate-x-6' : 'translate-x-1'
                      }`}
                  />
                </button>
              </div>

              <div className="flex items-start justify-between py-3 border-b border-gray-100">
                <div className='w-[30%] md:w-[50%]'>
                  <h3 className="font-medium text-gray-900 text-sm md:text-base mb-1">Weekend Notifications</h3>
                  <p className="text-xs md:text-sm text-gray-500">Receive notifications during weekends</p>
                </div>
                <button
                  onClick={() => setNotifications({ ...notifications, weekendNotifications: !notifications.weekendNotifications })}
                  className={`relative inline-flex h-4 w-9 md:h-6 md:w-11 items-center rounded-full transition-colors ${notifications.weekendNotifications ? 'bg-primary2' : 'bg-gray-300'
                    }`}
                >
                  <span
                    className={`inline-block h-3 w-3 md:h-4 md:w-4 transform rounded-full bg-white transition-transform ${notifications.weekendNotifications ? 'translate-x-6' : 'translate-x-1'
                      }`}
                  />
                </button>
              </div>

              <div className="flex items-start justify-between py-3">
                <div className='w-[30%] md:w-[50%]'>
                  <h3 className="font-medium text-gray-900 text-sm md:text-base mb-1">Urgent Only</h3>
                  <p className="text-sm text-gray-500">Only notify for urgent emails</p>
                </div>
                <button
                  onClick={() => setNotifications({ ...notifications, urgentOnly: !notifications.urgentOnly })}
                  className={`relative inline-flex h-4 w-9 md:h-6 md:w-11 items-center rounded-full transition-colors ${notifications.urgentOnly ? 'bg-primary2' : 'bg-gray-300'
                    }`}
                >
                  <span
                    className={`inline-block h-3 w-3 md:h-4 md:w-4 transform rounded-full bg-white transition-transform ${notifications.urgentOnly ? 'translate-x-6' : 'translate-x-1'
                      }`}
                  />
                </button>
              </div> */}
            </div>
          </div>
        );

      case 'preference':
        return (
          <div className="bg-white rounded-lg p-3 md:p-6">
            <h2 className="text-base md:text-lg font-semibold mb-6">Display & Behavior</h2>

            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Language
                  </label>
                  <select
                    value={preferences.language}
                    onChange={(e) => setPreferences({ ...preferences, language: e.target.value })}
                    className="w-full px-4 py-2.5 text-sm md:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary2 focus:border-transparent outline-none transition-all bg-white"
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
                    className="w-full px-4 py-2.5 text-sm md:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary2 focus:border-transparent outline-none transition-all bg-white"
                  >
                    <option value="08">08</option>
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="50">50</option>
                  </select>
                </div>
              </div>

              <div className="flex items-start justify-between py-3 border-b border-gray-100">
                <div className='w-[30%] md:w-[50%]'>
                  <h3 className="font-medium text-gray-900 text-sm md:text-base mb-1">Auto-save drafts</h3>
                  <p className="text-xs md:text-sm text-gray-500">Automatically save email drafts while composing</p>
                </div>
                <button
                  onClick={() => setPreferences({ ...preferences, autoSaveDrafts: !preferences.autoSaveDrafts })}
                  className={`relative inline-flex h-4 w-8 md:h-6 md:w-11 items-center rounded-full transition-colors ${preferences.autoSaveDrafts ? 'bg-primary2' : 'bg-gray-300'
                    }`}
                >
                  <span
                    className={`inline-block h-3 w-3 md:h-4 md:w-4 transform rounded-full bg-white transition-transform ${preferences.autoSaveDrafts ? 'translate-x-6' : 'translate-x-1'
                      }`}
                  />
                </button>
              </div>

              <div className="flex items-start justify-between py-3">
                <div className='w-[30%] md:w-[50%]'>
                  <h3 className="font-medium text-gray-900 text-sm md:text-base mb-1">Read receipts</h3>
                  <p className="text-xs md:text-sm text-gray-500">Send read receipts when requested</p>
                </div>
                <button
                  onClick={() => setPreferences({ ...preferences, readReceipts: !preferences.readReceipts })}
                  className={`relative inline-flex h-4 w-8 md:h-6 md:w-11 items-center rounded-full transition-colors ${preferences.readReceipts ? 'bg-primary2' : 'bg-gray-300'
                    }`}
                >
                  <span
                    className={`inline-block h-3 w-3 md:h-4 md:w-4 transform rounded-full bg-white transition-transform ${preferences.readReceipts ? 'translate-x-6' : 'translate-x-1'
                      }`}
                  />
                </button>
              </div>
            </div>
          </div>
        );

      case 'security':
        return (
          <div className="bg-white rounded-lg p-3 md:p-6">
            <h2 className="md:text-lg font-semibold mb-6">Password & Security</h2>

            <div className="space-y-6 mb-8">
              <h3 className="font-medium text-gray-900 text-sm md:text-base">Change Password</h3>

              <div>
                <label className="block text-xs md:text-sm font-medium text-gray-700 mb-2">
                  Current Password
                </label>
                <div className="relative">
                  <input
                    type={showCurrentPassword ? 'text' : 'password'}
                    value={security.currentPassword}
                    onChange={(e) => setSecurity({ ...security, currentPassword: e.target.value })}
                    className="w-full px-4 py-2.5 text-sm md:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary2 focus:border-transparent outline-none transition-all pr-10"
                  />
                  <button
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showCurrentPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs md:text-sm font-medium text-gray-700 mb-2">
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
                  <label className="block text-xs md:text-sm font-medium text-gray-700 mb-2">
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
                <div className='w-[30%] md:w-[50%]'>
                  <h3 className="font-medium text-gray-900 mb-1 text-sm md:text-base">Two-Factor Authentication</h3>
                  <p className="text-xs md:text-sm text-gray-500">Add an extra layer of security to your account</p>
                </div>
                <button
                  onClick={() => setSecurity({ ...security, twoFactorAuth: !security.twoFactorAuth })}
                  className={`relative inline-flex h-4 w-9 md:h-6 md:w-11 items-center rounded-full transition-colors ${security.twoFactorAuth ? 'bg-primary2' : 'bg-gray-300'
                    }`}
                >
                  <span
                    className={`inline-block w-3 h-3 md:h-4 md:w-4 transform rounded-full bg-white transition-transform ${security.twoFactorAuth ? 'translate-x-6' : 'translate-x-1'
                      }`}
                  />
                </button>
              </div>

              <div className="flex items-start justify-between py-3 border-b border-gray-100">
                <div className="flex-1 w-[30%] md:w-[50%]">
                  <h3 className="font-medium text-gray-900 mb-1 text-sm md:text-base">Session timeout (hours)</h3>
                  <p className="text-xs md:text-sm text-gray-500">Select your Session timeout (hours)</p>
                </div>
                <select
                  value={security.sessionTimeout}
                  onChange={(e) => setSecurity({ ...security, sessionTimeout: e.target.value })}
                  className="ml-4 md:px-3 md:py-1.5 text-xs md:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary2 focus:border-transparent outline-none transition-all bg-white text-sm"
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
                <div className='w-[30%] md:w-[50%]'>
                  <h3 className="font-medium text-gray-900 text-sm md:text-base mb-1">Login alerts</h3>
                  <p className="text-xs md:text-sm text-gray-500">Get notified of new login attempts</p>
                </div>
                <button
                  onClick={() => setSecurity({ ...security, loginAlerts: !security.loginAlerts })}
                  className={`relative inline-flex h-4 w-9 md:h-6 md:w-11 items-center rounded-full transition-colors ${security.loginAlerts ? 'bg-primary2' : 'bg-gray-300'
                    }`}
                >
                  <span
                    className={`inline-block w-3 h-3 md:h-4 md:w-4 transform rounded-full bg-white transition-transform ${security.loginAlerts ? 'translate-x-6' : 'translate-x-1'
                      }`}
                  />
                </button>
              </div>
            </div>
          </div>
        );
      case 'credential':
        return (
          <div className="bg-white rounded-lg p-3 overflow-x-auto">
            <h2 className="text-lg font-semibold mb-6">User Credentials</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Provider
                </label>
                <input
                  type="text"
                  value={credentialsData.provider}
                  onChange={(e) => setCredentialsData({ ...
                    credentialsData, provider: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary2 focus:border-transparent outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={credentialsData.email_address}
                  onChange={(e) => setCredentialsData({ ...credentialsData, email_address: e.target.value })}
                  readOnly
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary2 focus:border-transparent outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  SMTP Host
                </label>
                <input
                  type="email"
                  value={credentialsData.smtp_host}
                  onChange={(e) => setCredentialsData({ ...credentialsData, smtp_host: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary2 focus:border-transparent outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  SMTP Port
                </label>
                 <input
                  type="number"
                  value={credentialsData.smtp_port}
                  onChange={(e) =>
                    setCredentialsData({
                      ...credentialsData,
                      smtp_port: Number(e.target.value),
                    })
                  }
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary2 focus:border-transparent outline-none transition-all"
                />
              </div> 
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  SMTP Password
                </label>
                 <input
                  type="text"
                  value={credentialsData.smtp_password}
                  onChange={(e) => setCredentialsData({ ...credentialsData, smtp_password: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary2 focus:border-transparent outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  IMAP Host
                </label>
                <input
                  type="email"
                  value={credentialsData.imap_host}
                  onChange={(e) => setCredentialsData({ ...credentialsData, imap_host: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary2 focus:border-transparent outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  IMAP Port
                </label>
                 <input
                  type="number"
                  value={credentialsData.imap_port}
                  onChange={(e) =>
                    setCredentialsData({
                      ...credentialsData,
                      imap_port: Number(e.target.value),
                    })
                  }
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary2 focus:border-transparent outline-none transition-all"
                />
              </div> 
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  IMAP Password
                </label>
                 <input
                  type="text"
                  value={credentialsData.imap_password}
                  onChange={(e) => setCredentialsData({ ...credentialsData, imap_password: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary2 focus:border-transparent outline-none transition-all"
                />
              </div>
            </div>
            <div className="flex items-center justify-between py-3 border-t border-gray-200 mt-4">
                <div className='w-[30%] md:w-[50%]'>
                  <h3 className="font-medium text-gray-900 text-sm md:text-base mb-1">SSL</h3>
                  <p className="text-xs md:text-sm text-gray-500">Get notified of SSL attempts</p>
                </div>
                <button
                  onClick={() =>
                    setCredentialsData({
                      ...credentialsData,
                      is_ssl: !credentialsData.is_ssl,
                    })
                  }
                  className={`relative inline-flex h-4 w-9 md:h-6 md:w-11 items-center rounded-full transition-colors ${
                    credentialsData.is_ssl ? 'bg-teal-500' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`inline-block w-3 h-3 md:h-4 md:w-4 transform rounded-full bg-white transition-transform ${
                      credentialsData.is_ssl ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>

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
          <div className="flex items-center gap-0 md:gap-3">
            <Link to={'/user'} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <ArrowLeft size={20} />
            </Link>
            <h1 className="text-lg md:text-xl font-semibold text-gray-900">Settings</h1>
          </div>

          {/* <button className="flex items-center gap-2 bg-primary2 hover:bg-orange-600 text-white px-4 py-2.5 rounded-lg transition-colors font-medium">
            <Save size={18} />
            <p className='hidden md:block'>Save Changes</p>
          </button> */}
          {/* <button
            onClick={activeTab === 'security' ? handleChangePassword : undefined}
            disabled={isChanging}
            className="flex items-center gap-2 bg-primary2 hover:bg-orange-600 text-white px-4 py-2.5 rounded-lg transition-colors font-medium disabled:opacity-50"
          >
            <Save size={18} />
            <p className="hidden md:block">
              {isChanging ? "Saving..." : "Save Changes"}
            </p>
          </button> */}
          <button
              onClick={() => {
                if (activeTab === "profile") handleSaveProfile();
                if (activeTab === "security") handleChangePassword();
                if (activeTab === "notification") handleSaveNotifications();
                if (activeTab === "credential") handleSaveCredentials();
              }}
              disabled={
                isChanging ||
                isUpdatingNotification ||
                isUpdating ||
                isUpdatingProfile
              }
              className="flex items-center gap-2 bg-primary2 hover:bg-orange-600 text-white px-4 py-2.5 rounded-lg transition-colors font-medium disabled:opacity-50"
            >
              <Save size={18} />
              <p className="hidden md:block">
                {isChanging || isUpdatingNotification || isUpdating || isUpdatingProfile
                  ? "Saving..."
                  : "Save Changes"}
              </p>
            </button>



        </div>
      </header>


      <div className="p-10">


        <div className="md:flex gap-2 mb-6 ">
          <button
            onClick={() => setActiveTab('profile')}
            className={`flex items-center gap-2 mb-2 md:mb-0 px-4 py-2.5 font-medium transition-all relative ${activeTab === 'profile'
                ? 'bg-primary2 text-white rounded-lg'
                : 'text-gray-600 hover:text-gray-900 border border-[#DFE3E8] rounded-lg'
              }`}
          >
            <User size={18} />
            Profile
          </button>

          <button
            onClick={() => setActiveTab('notification')}
            className={`flex items-center gap-2 mb-2 md:mb-0 px-4 py-2.5 font-medium transition-all relative ${activeTab === 'notification'
                ? 'bg-primary2 text-white rounded-lg'
                : 'text-gray-600 hover:text-gray-900 border border-[#DFE3E8] rounded-lg'
              }`}
          >
            <Bell size={18} />
            Notification
          </button>

          <button
            onClick={() => setActiveTab('preference')}
            className={`flex items-center gap-2 mb-2 md:mb-0 px-4 py-2.5 font-medium transition-all relative ${activeTab === 'preference'
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
          <button
            onClick={() => setActiveTab('credential')}
            className={`flex items-center gap-2 px-4 py-2.5 font-medium transition-all relative ${activeTab === 'credential'
                ? 'bg-primary2 text-white rounded-lg'
                : 'text-gray-600 hover:text-gray-900 border border-[#DFE3E8] rounded-lg'
              }`}
          >
            <RotateCcwKey size={18} />
            Credential 
          </button>
        </div>

        {renderContent()}
      </div>
    </div>
  );
}
