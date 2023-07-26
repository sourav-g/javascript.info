function addUserId(userId) {
  return (item) => {
    item.userId = userId;
    return item;
  };
}

const items = [{ id: 1 }, { id: 2 }];

const newItems = items.map((item) => {
  item.user = "abc";
  return item;
});

console.log(items);
console.log(newItems);
console.log(items == newItems);
