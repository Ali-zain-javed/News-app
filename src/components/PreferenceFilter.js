import { useState, useCallback, useMemo } from "react";
import {
  newsSources,
  newsCategories,
  newsApiSections,
  guardianSections,
  nytSections,
} from "../constants";
import React from "react";

const PreferenceFilter = React.memo(
  ({
    setPreferenceVisible,
    handlePreferenceSubmit,
    setPreferencesValues,
    preferencesValues,
  }) => {
    //handle preference change and add to the preferences array
    const handlePreferenceChange = useCallback(
      (e) => {
        const { name, value } = e.target;
        let preferences = {};
        if (name === "source") {
          preferences.source = value;
        }
        if (name === "category") {
          preferences.category = value;
        }
        if (name === "author") {
          preferences.author = value;
        }
        const updatedPreferences = {
          ...preferencesValues,
        };

        // Add source if it's not empty and not already in the array
        if (
          preferences.source &&
          !preferencesValues.preferredSources.includes(preferences.source)
        ) {
          updatedPreferences.preferredSources = [
            ...preferencesValues.preferredSources,
            preferences.source,
          ];
        }

        // Add category if it's not empty and not already in the array
        if (
          preferences.category &&
          !preferencesValues.preferredCategories.includes(preferences.category)
        ) {
          updatedPreferences.preferredCategories = [preferences.category];
        }

        // Add author if it's not empty and not already in the array
        if (
          preferences.author &&
          !preferencesValues.preferredAuthors.includes(preferences.author)
        ) {
          updatedPreferences.preferredAuthors = [
            ...preferencesValues.preferredAuthors,
            preferences.author,
          ];
        }

        // Update state and pass updated preferences to handlePreferenceSubmit
        setPreferencesValues(updatedPreferences);
        handlePreferenceSubmit(updatedPreferences);
      },
      [preferencesValues, setPreferencesValues, handlePreferenceSubmit]
    );

    //remove preference item value on badge click
    const removePreference = useCallback(
      (name, value) => {
        // Remove that value from the preferences array
        let newPreferencesValues = { ...preferencesValues };
        newPreferencesValues[name] = preferencesValues[name].filter(
          (pref) => pref !== value
        );

        setPreferencesValues(newPreferencesValues);
        handlePreferenceSubmit(newPreferencesValues);
      },
      [preferencesValues, setPreferencesValues, handlePreferenceSubmit]
    );

    // Memoize the category options to prevent unnecessary re-computation
    const getCategoryOptions = useMemo(() => {
      if (
        preferencesValues?.preferredSources?.length === 1 &&
        preferencesValues?.preferredSources?.includes("newsapi")
      ) {
        return newsApiSections;
      } else if (
        preferencesValues?.preferredSources?.length === 1 &&
        preferencesValues?.preferredSources?.includes("guardian")
      ) {
        return guardianSections;
      } else if (
        preferencesValues?.preferredSources?.length === 1 &&
        preferencesValues?.preferredSources?.includes("nyt")
      ) {
        return nytSections;
      } else {
        return newsCategories; // General categories if no specific source is selected
      }
    }, [preferencesValues?.preferredSources]);

    const [author, setAuthor] = useState("");

    return (
      <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex  items-center justify-center">
        <div className="bg-white p-6 rounded-lg w-96">
          <h2 className="text-xl font-bold mb-4">Personalize Your Feed</h2>

          <div className="mb-4">
            <label className="block mb-2">Preferred Sources</label>
            {preferencesValues?.preferredSources.map((source) => (
              <span
                key={source}
                className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10 mr-1 mb-2">
                {source}
                <button
                  className="ml-2 text-red-500"
                  onClick={() => removePreference("preferredSources", source)}>
                  ×
                </button>
              </span>
            ))}
            <select
              name="source"
              className="border p-2 w-full"
              onChange={handlePreferenceChange}>
              <option value="">All Sources</option>
              {newsSources.map((source) => (
                <option key={source.source} value={source.source}>
                  {source.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block mb-2">Preferred Categories</label>
            {preferencesValues?.preferredCategories.map((category) => (
              <span
                key={category}
                className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10 mr-1 mb-2">
                {category}
                <button
                  className="ml-2 text-red-500"
                  onClick={() =>
                    removePreference("preferredCategories", category)
                  }>
                  ×
                </button>
              </span>
            ))}
            <select
              name="category"
              className="border p-2 w-full"
              onChange={handlePreferenceChange}>
              <option value="">All Categories</option>
              {getCategoryOptions.map((cat) => (
                <option key={cat?.category} value={cat?.category}>
                  {cat?.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block mb-2">Preferred Authors</label>
            {preferencesValues?.preferredAuthors.map((author) => (
              <span
                key={author}
                className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10 mr-1 mb-2">
                {author}
                <button
                  className="ml-2 text-red-500"
                  onClick={() => removePreference("preferredAuthors", author)}>
                  ×
                </button>
              </span>
            ))}
            <div className="flex">
              <input
                type="text"
                name="author"
                className="border p-2 w-full"
                placeholder="Enter author name"
                onChange={(e) => setAuthor(e.target.value)}
                value={author}
              />
              <button
                className="text-blue-500 ml-2"
                onClick={() => {
                  handlePreferenceChange({
                    target: { name: "author", value: author },
                  });
                  setAuthor("");
                }}>
                Add
              </button>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              className="bg-gray-500 text-white px-4 py-2 rounded"
              onClick={() => setPreferenceVisible(false)}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }
);

export default PreferenceFilter;
