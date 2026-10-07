import React from "react";

const PostMetaFields = ({ form, setForm, requiredCategory = false }) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      <div className="flex-1">
        <label
          className="block text-xs font-medium mb-1.5 uppercase tracking-wider"
          style={{ color: "var(--color-text-muted)" }}
        >
          Category
        </label>
        <input
          type="text"
          placeholder="e.g. Web Development"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          required={requiredCategory}
          className="input-clean text-sm"
        />
      </div>
      <div className="flex-1">
        <label
          className="block text-xs font-medium mb-1.5 uppercase tracking-wider"
          style={{ color: "var(--color-text-muted)" }}
        >
          Tags (comma separated)
        </label>
        <input
          type="text"
          placeholder="e.g. react, javascript"
          value={form.tags}
          onChange={(e) => setForm({ ...form, tags: e.target.value })}
          className="input-clean text-sm"
        />
      </div>
    </div>
  );
};

export default PostMetaFields;
