<div
  style={{
    display: "flex",
  }}
>
  <div>
    <textarea id={postTextAreaId} name="postContent" />
  </div>
  <div>
    <div style={{ width: "200px" }}>
      <Select value={language} onChange={setLanguage} options={options} />
    </div>

    <Editor
      height="90vh"
      width="90vw"
      language={language.value}
      defaultValue="#Write your code here"
    />
  </div>
</div>;
