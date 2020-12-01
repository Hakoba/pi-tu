export default {
  methods: {
    buildTree(list) {
      let map = {};
      let node = [];
      let roots = [];

      for (let i = 0; i < list.length; i += 1) {
        map[list[i].id] = i; // initialize the map
        list[i].children = []; // initialize the children
      }
      for (let i = 0; i < list.length; i += 1) {
        node = list[i];
        if (node.pid === "NULL" || node.pid === null) node.pid = "";
        if (node.pid !== "") {
          // if you have dangling branches check that map[node.parentId] exists
          if (list[map[node.pid]]) {
            list[map[node.pid]].children.push(node);
          }
        } else {
          delete node["ParentID"];
          roots.push(node);
        }
      }

      return roots;
    }
  }
};
