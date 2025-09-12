// // Nama user login
// const userName = "Admin"; // bisa diganti ambil dari localStorage
// document.getElementById("userName").textContent = userName;
// document.getElementById("name").value = userName;

// // Logout
// document.getElementById("logoutBtn").addEventListener("click", () => {
//   localStorage.removeItem("isLoggedIn");
//   window.location.href = "login.html";
// });

// // Jam & Tanggal real-time
// function updateDateTime() {
//   const now = new Date();
//   const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
//   document.getElementById('dateToday').textContent = now.toLocaleDateString('id-ID', options);
//   document.getElementById('clock').textContent = now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
// }
// setInterval(updateDateTime, 1000);
// updateDateTime();

// // ===== Dummy Data & History =====
// let absensiHistory = JSON.parse(localStorage.getItem("absensiHistory") || "[]");

// if (absensiHistory.length === 0) {
//   const dummyData = [];
//   const dummyNames = ["Masuk", "Keluar"];
//   const now = new Date();
//   for (let i = 1; i <= 23; i++) {
//     const date = new Date(now.getFullYear(), now.getMonth(), now.getDate() - i);
//     const time = `${date.getHours().toString().padStart(2,'0')}:${date.getMinutes().toString().padStart(2,'0')}:00`;
//     const type = dummyNames[i % 2];
//     dummyData.push({ date: date.toLocaleDateString('id-ID'), time, type });
//   }
//   absensiHistory = dummyData;
//   localStorage.setItem("absensiHistory", JSON.stringify(absensiHistory));
// }

// // ===== Pagination =====
// const historyList = document.getElementById("historyList");
// const prevPageBtn = document.getElementById("prevPage");
// const nextPageBtn = document.getElementById("nextPage");
// const pageInfo = document.getElementById("pageInfo");
// let currentPage = 1;
// const itemsPerPage = 5;

// function renderHistory(page = 1) {
//   const start = (page - 1) * itemsPerPage;
//   const end = start + itemsPerPage;
//   const pagedData = absensiHistory.slice().reverse().slice(start, end);

//   historyList.innerHTML = "";
//   pagedData.forEach(item => {
//     const li = document.createElement("li");
//     li.className = "px-3 py-1 border rounded-lg text-sm bg-gray-50";
//     li.textContent = `${item.date} - ${item.time} (${item.type})`;
//     historyList.appendChild(li);
//   });

//   const totalPages = Math.ceil(absensiHistory.length / itemsPerPage);
//   pageInfo.textContent = `Halaman ${currentPage} / ${totalPages}`;
//   prevPageBtn.disabled = currentPage === 1;
//   nextPageBtn.disabled = currentPage === totalPages;
// }

// prevPageBtn.addEventListener("click", () => {
//   if (currentPage > 1) currentPage--;
//   renderHistory(currentPage);
// });

// nextPageBtn.addEventListener("click", () => {
//   const totalPages = Math.ceil(absensiHistory.length / itemsPerPage);
//   if (currentPage < totalPages) currentPage++;
//   renderHistory(currentPage);
// });

// renderHistory(currentPage);

// // ===== Absensi Form =====
// const form = document.getElementById("absensiForm");
// const submitBtn = document.getElementById("submitBtn");
// const infoJam = document.getElementById("infoJam");

// window.addEventListener("load", () => {
//   // Lokasi
//   if (navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition(position => {
//       document.getElementById("location").value = `${position.coords.latitude}, ${position.coords.longitude}`;
//     });
//   }

//   // Validasi jam absensi
//   const now = new Date();
//   const jam = now.getHours();
//   const menit = now.getMinutes();
//   const mulai = 8 * 60 + 30; // 08:30
//   const akhir = 9 * 60;      // 09:00
//   const sekarang = jam * 60 + menit;

//   if (sekarang < mulai || sekarang >= akhir) {
//     submitBtn.disabled = true;
//     infoJam.textContent = "Absensi hanya bisa dilakukan antara jam 08:30 - 09:00";
//   } else {
//     submitBtn.disabled = false;
//     infoJam.textContent = "Absensi dibuka, silakan submit form";
//   }
// });

// form.addEventListener("submit", function (e) {
//   e.preventDefault();

//   const now = new Date();
//   const date = now.toLocaleDateString('id-ID');
//   const time = now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' });

//   let type = "Masuk";
//   if (absensiHistory.length > 0 && absensiHistory[absensiHistory.length - 1].type === "Masuk") {
//     type = "Keluar";
//   }

//   document.getElementById("type").value = type;
//   document.getElementById("time").value = now.toLocaleString();

//   absensiHistory.push({ date, time, type });
//   localStorage.setItem("absensiHistory", JSON.stringify(absensiHistory));

//   currentPage = Math.ceil(absensiHistory.length / itemsPerPage);
//   renderHistory(currentPage);

//   submitBtn.textContent = type === "Masuk" ? "Absen Keluar" : "Sudah Keluar";
//   submitBtn.disabled = false;
// });
