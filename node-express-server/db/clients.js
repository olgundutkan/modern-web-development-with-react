var uniqid = require("uniqid");
var randomHexColor = require('random-hex-color')

let autoIncrementNumber = 0;

let data = [];

const add = (params, status) => {
  autoIncrementNumber++;
  const newData = {
    id: autoIncrementNumber,
    name: `Client ${autoIncrementNumber}`,
    position: params,
    status: status
  };
  data.push(newData);
  return newData;
};

const addClient = (id) => {
  // const id = uniqid();
  autoIncrementNumber++;
  const newData = {
    id: id,
    name: `Client ${autoIncrementNumber}`,
    position: { x: "", y: "" },
    status: "JOINED",
    color: randomHexColor()
  };
  data.push(newData);
  return newData;
};

const getItem = id => {
  const index = data.findIndex(item => item.id === id);
  if (index !== -1) {
    return data[index];
  }
  throw new Error();
};

const deleteItem = id => {
  const index = data.findIndex(item => item.id === id);
  if (index !== -1) {
    return data.splice(index, 1);
  }
  throw new Error();
};

const updateItem = (id, position) => {
  const client = getItem(id);
  client.position= position;
  client.status= "ON BOARD";
  return client;
};



exports.add = add;
exports.addClient = addClient;
exports.getItem = getItem;
exports.delete = deleteItem;
exports.updateItem = updateItem;

exports.data = data;
