let dbg = (...args) => {
  if (process.env.NODE_ENV !== "production") {
    let startTemplate = "%c%s";
    const firstParam = args[0];
    let color = "#046bd6";
    let keyWord = "DEBUG";
    let icon = "🖱";
    if (typeof firstParam === "string") {
      if (/err/.test(firstParam.toLocaleLowerCase())) {
        keyWord = "ERROR";
        color = "#e23433";
      }

      startTemplate = "%c%s%c%s";
      const modifyStr = [`color: ${color}`, firstParam];
      args.splice(0, 1, ...modifyStr);
    } else if (typeof firstParam === "object" && firstParam.log) {
      keyWord = "REQUEST";
      color = "#ab00ab";
      icon = "🌐";
    }
    const settings = [
      startTemplate,
      `
          color: white;
          background: ${color};
          border-radius: 5px; 
          font-size: 11px; 
          padding: 3px 8px 3px 8px;
          margin-right: 5px`,
      `${icon} ${keyWord}`
    ];
    console.log(...settings, ...args);
  }
};

export default dbg;
