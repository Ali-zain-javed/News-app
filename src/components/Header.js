import React from "react";

// Tabs data with href and current status

// Utility function to combine class names conditionally
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const HeaderWithTabs = React.memo(({ tabs, onCurrentTabChange }) => {
  return (
    <div className="bg-gray-100 mb-8">
      {/* Header Title */}
      <div className="text-center py-6 bg-blue-500 text-white">
        <h1 className="text-3xl font-bold">News Aggregator</h1>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <div className="sm:hidden">
          <label htmlFor="tabs" className="sr-only">
            Select a tab
          </label>
          <select
            onChange={(e) => onCurrentTabChange(e.target.value)}
            id="tabs"
            name="tabs"
            defaultValue={tabs.find((tab) => tab.current).name}
            className="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm">
            {tabs.map((tab) => (
              <option key={tab.name}>{tab.name}</option>
            ))}
          </select>
        </div>
        <div className="hidden sm:block">
          <nav
            className="-mb-px flex justify-center space-x-8"
            aria-label="Tabs">
            {tabs.map((tab) => (
              <a
                onClick={() => onCurrentTabChange(tab.name)}
                key={tab.name}
                href={tab.href}
                aria-current={tab.current ? "page" : undefined}
                className={classNames(
                  tab.current
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-black hover:border-gray-300 hover:text-gray-700",
                  "whitespace-nowrap border-b-2 px-3 py-4 text-sm font-medium"
                )}>
                {tab.name}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
});

export default HeaderWithTabs;
