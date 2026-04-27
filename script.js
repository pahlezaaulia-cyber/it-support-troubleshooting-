document.addEventListener("DOMContentLoaded", function() {

let masalahList = [

  // NETWORK
  {category:"network", name:"WiFi Tidak Connect", steps:["Cek WiFi aktif","Restart router","Reconnect jaringan","Update driver WiFi"]},
  {category:"network", name:"Internet Lambat", steps:["Restart modem","Gunakan LAN","Batasi user","Scan malware"]},
  {category:"network", name:"Tidak Bisa Akses Website", steps:["Cek koneksi","Flush DNS","Coba browser lain"]},
  {category:"network", name:"IP Conflict", steps:["Restart router","Gunakan DHCP","Release & renew IP"]},
  {category:"network", name:"WiFi Sering Putus", steps:["Dekatkan ke router","Ganti channel WiFi","Update driver"]},

  // HARDWARE
  {category:"hardware", name:"Keyboard Tidak Berfungsi", steps:["Restart PC","Cek driver","Coba port lain"]},
  {category:"hardware", name:"Mouse Tidak Berfungsi", steps:["Cek USB","Ganti baterai","Tes di device lain"]},
  {category:"hardware", name:"USB Tidak Terbaca", steps:["Coba port lain","Cek Disk Management","Update driver"]},
  {category:"hardware", name:"Tidak Ada Tampilan", steps:["Cek kabel","Cek RAM","Cek VGA"]},
  {category:"hardware", name:"Printer Tidak Terhubung", steps:["Cek kabel/WiFi","Install driver","Restart printer"]},

  // SOFTWARE
  {category:"software", name:"Aplikasi Crash", steps:["Restart aplikasi","Update aplikasi","Reinstall"]},
  {category:"software", name:"Tidak Bisa Install Aplikasi", steps:["Run as admin","Cek storage","Disable antivirus"]},
  {category:"software", name:"Windows Tidak Update", steps:["Restart service","Cek koneksi","Clear cache update"]},
  {category:"software", name:"File Tidak Bisa Dibuka", steps:["Cek format file","Gunakan aplikasi lain","Repair file"]},
  {category:"software", name:"Aplikasi Tidak Merespon", steps:["End task","Restart PC","Update aplikasi"]},

  // SYSTEM
  {category:"system", name:"PC Lemot", steps:["Task Manager","Scan virus","Disk cleanup","Upgrade RAM"]},
  {category:"system", name:"Laptop Overheat", steps:["Bersihkan kipas","Cooling pad","Ganti thermal paste"]},
  {category:"system", name:"Blue Screen (BSOD)", steps:["Catat error","Update driver","Scan RAM"]},
  {category:"system", name:"Storage Penuh", steps:["Hapus file","Disk cleanup","Pindahkan data"]},
  {category:"system", name:"Baterai Cepat Habis", steps:["Turunkan brightness","Tutup background app","Cek baterai"]},

  // SECURITY
  {category:"security", name:"Terkena Virus", steps:["Scan antivirus","Hapus file mencurigakan","Update antivirus"]},
  {category:"security", name:"Akun Terkena Hack", steps:["Ganti password","Aktifkan 2FA","Logout semua device"]},
  {category:"security", name:"Phishing Email", steps:["Jangan klik link mencurigakan","Laporkan email","Hapus email"]},
  {category:"security", name:"Firewall Memblokir Aplikasi", steps:["Cek firewall","Allow aplikasi","Disable sementara"]},
  {category:"security", name:"Password Lupa", steps:["Gunakan fitur reset","Cek email recovery","Hubungi admin"]}

];

let select = document.getElementById("problem");

// LOAD DROPDOWN
function loadMasalah(list) {
  select.innerHTML = "<option value=''>-- Pilih Masalah --</option>";
  list.forEach(item => {
    let opt = document.createElement("option");
    opt.value = item.name;
    opt.textContent = item.name;
    select.appendChild(opt);
  });
}

loadMasalah(masalahList);

// SEARCH
window.filterMasalah = function() {
  let keyword = document.getElementById("search").value.toLowerCase();
  let filtered = masalahList.filter(m => m.name.toLowerCase().includes(keyword));
  loadMasalah(filtered);
};

// FILTER KATEGORI
window.filterCategory = function() {
  let cat = document.getElementById("category").value;

  if (cat === "all") {
    loadMasalah(masalahList);
    return;
  }

  let filtered = masalahList.filter(m => m.category === cat);
  loadMasalah(filtered);
};

// DIAGNOSA
window.diagnosa = function() {
  let selected = select.value;
  let result = document.getElementById("result");

  let data = masalahList.find(m => m.name === selected);

  if (!data) {
    result.innerHTML = "⚠️ Pilih masalah dulu!";
    return;
  }

  result.innerHTML = `<div class="result-title">🔧 ${data.name}</div>`;

  data.steps.forEach((step, i) => {
    setTimeout(() => {
      let div = document.createElement("div");
      div.className = "step";
      div.textContent = `Step ${i+1}: ${step}`;
      result.appendChild(div);
    }, i * 250);
  });
};

// COPY HASIL
window.copyResult = function() {
  let text = document.getElementById("result").innerText;

  if (!text) {
    alert("Belum ada hasil!");
    return;
  }

  navigator.clipboard.writeText(text);
  alert("Hasil berhasil dicopy!");
};

});