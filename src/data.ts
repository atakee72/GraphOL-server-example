const users = [
  {
    id: "1",
    fullName: "Mehmet Seven",
  },
  { id: "2", fullName: "Ahmet Günal" },
];

const posts = [
  { id: "1", title: "Mehmet's post", user_id: "1" },
  { id: "2", title: "Mehmet's other post", user_id: "1" },
  { id: "3", title: "Ahmet's post", user_id: "2" },
];

const comments = [
  { id: "1", text: "This is Ahmet's comment", post_id: "1", user_id: "2" },
  { id: "2", text: "Mehmet's comment", post_id: "1", user_id: "1" },
  { id: "3", text: "foo bar", post_id: "2", user_id: "2" },
  { id: "4", text: "foo bar baz", post_id: "3", user_id: "1" },
];

export { users, posts, comments };
