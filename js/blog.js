function loadPosts() {
const saved = localStorage.getItem("blog-posts");
return saved ? JSON.parse(saved) : [];
}

function savePosts(posts) {
localStorage.setItem("blog-posts", JSON.stringify(posts));
}

function renderPosts() {
const container = document.querySelector("#posts-container");
const posts = loadPosts();
if (posts.length === 0) {
container.innerHTML = "<p class=\"no-posts\">No posts yet. Write your first one!</p>";
return;
}
container.innerHTML = posts
.slice().reverse()
.map(post => `
<article class="blog-post">
<div class="post-meta">
<span class="post-date">${post.date}</span>
</div>
<h2>${post.title}</h2>
<p>${post.body}</p>
<button class="delete-btn" data-id="${post.id}">Delete</button>
</article>
`)
.join("" );
document.querySelectorAll(".delete-btn")
.forEach(btn => {
btn.addEventListener("click", () => deletePost(btn.dataset.id));
});
}

function deletePost(id) {
let posts = loadPosts().filter(p => p.id !== id);
savePosts(posts);
renderPosts();
}

document.querySelector("#publish-btn").addEventListener("click", () => {
const title = document.querySelector("#post-title").value.trim();
const body = document.querySelector("#post-body").value.trim();
if (!title || !body) {
alert("Please fill in both the title and body.");
return;
}
const newPost = {
id: Date.now().toString(),
title: title,
body: body,
date: new Date().toLocaleDateString("en-GH",
{ year: "numeric", month: "long", day: "numeric" })
};
const posts = loadPosts();
posts.push(newPost);
savePosts(posts);
document.querySelector("#post-title").value = "";
document.querySelector("#post-body").value = "";
document.querySelector("#post-form").classList.add("hidden");
renderPosts();
});

document.querySelector("#new-post-btn").addEventListener("click", () => {
document.querySelector("#post-form").classList.remove("hidden");
});
document.querySelector("#cancel-btn").addEventListener("click", () => {
document.querySelector("#post-form").classList.add("hidden");
});

renderPosts();