// SuperUserManagement/SecurityTab.tsx
interface SecurityTabProps {
  twoFaEnabled: boolean;
  setTwoFaEnabled: (v: boolean) => void;
  failedLoginAlert: boolean;
  setFailedLoginAlert: (v: boolean) => void;
  ipWhitelist: boolean;
  setIpWhitelist: (v: boolean) => void;
  sessionTimeout: string;
  setSessionTimeout: (v: string) => void;
}

export default function SecurityTab({
  twoFaEnabled,
  setTwoFaEnabled,
  failedLoginAlert,
  setFailedLoginAlert,
  ipWhitelist,
  setIpWhitelist,
  sessionTimeout,
  setSessionTimeout,
}: SecurityTabProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">Platform Security Settings</h2>
      <p className="text-gray-600 text-sm mb-8">Enforce security policies across all accounts</p>

      {/* 2FA */}
      <div className="flex items-center justify-between pb-6 border-b border-gray-200">
        <div>
          <h3 className="font-semibold text-gray-900">Enforce 2FA for all users</h3>
          <p className="text-sm text-gray-600 mt-1">Require two-factor authentication for all platform users</p>
        </div>
        <button
          onClick={() => setTwoFaEnabled(!twoFaEnabled)}
          className={`relative w-14 h-8 rounded-full ${twoFaEnabled ? 'bg-orange-500' : 'bg-gray-300'}`}
        >
          <div
            className={`absolute w-6 h-6 bg-white rounded-full top-1 transition-transform ${
              twoFaEnabled ? 'translate-x-7' : 'translate-x-1'
            }`}
          ></div>
        </button>
      </div>

      {/* Timeout */}
      <div className="flex items-center justify-between pb-6 border-b border-gray-200">
        <div>
          <h3 className="font-semibold text-gray-900">Admin Session Timeout</h3>
          <p className="text-sm text-gray-600 mt-1">Automatically log out admin users after inactivity</p>
        </div>
        <select
          value={sessionTimeout}
          onChange={(e) => setSessionTimeout(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 bg-white"
        >
          <option>1 hour</option>
          <option>2 hours</option>
          <option>4 hours</option>
          <option>8 hours</option>
        </select>
      </div>

      {/* Failed Login Monitoring */}
      <div className="flex items-center justify-between pb-6 border-b border-gray-200">
        <div>
          <h3 className="font-semibold text-gray-900">Failed Login Monitoring</h3>
          <p className="text-sm text-gray-600 mt-1">Monitor and alert on suspicious login attempts</p>
        </div>
        <button
          onClick={() => setFailedLoginAlert(!failedLoginAlert)}
          className={`relative w-14 h-8 rounded-full ${failedLoginAlert ? 'bg-orange-500' : 'bg-gray-300'}`}
        >
          <div
            className={`absolute w-6 h-6 bg-white rounded-full top-1 transition-transform ${
              failedLoginAlert ? 'translate-x-7' : 'translate-x-1'
            }`}
          ></div>
        </button>
      </div>

      {/* IP Whitelist */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-gray-900">IP Whitelist for Admins</h3>
          <p className="text-sm text-gray-600 mt-1">Restrict admin access to specific IP ranges</p>
        </div>
        <button
          onClick={() => setIpWhitelist(!ipWhitelist)}
          className={`relative w-14 h-8 rounded-full ${ipWhitelist ? 'bg-orange-500' : 'bg-gray-300'}`}
        >
          <div
            className={`absolute w-6 h-6 bg-white rounded-full top-1 transition-transform ${
              ipWhitelist ? 'translate-x-7' : 'translate-x-1'
            }`}
          ></div>
        </button>
      </div>
    </div>
  );
}
