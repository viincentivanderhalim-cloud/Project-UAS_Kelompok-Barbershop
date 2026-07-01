/* ==========================================================
   PROJECT UAS
   Captain Barbershop

   File : script.js

   Pengembangan dari Project UTS

   Pada UTS website hanya berupa tampilan.
   Pada UAS ditambahkan JavaScript agar website
   menjadi lebih interaktif.

   Fitur:
   - Validasi Form
   - Local Storage
   - Menampilkan Data
   - Edit Data
   - Hapus Data
   - Search Data
========================================================== */



/* ==========================================================
   Mengambil elemen HTML yang akan digunakan
   pada JavaScript.
========================================================== */

const form = document.getElementById("form");
const table = document.getElementById("table");
const search = document.getElementById("search");
const bookingCount = document.getElementById("bookingCount");



/* ==========================================================
   Mengambil data booking yang sebelumnya
   sudah tersimpan di Local Storage.

   Jika belum ada data,
   maka akan dibuat array kosong.
========================================================== */

let bookings =
JSON.parse(localStorage.getItem("bookings")) || [];



/* ==========================================================
   Event ini dijalankan ketika tombol
   "Booking Sekarang" ditekan.
========================================================== */

if(form){

form.addEventListener("submit",function(e){

/* Mencegah halaman melakukan refresh */

e.preventDefault();



/* ==========================================================
   Mengambil seluruh data dari form booking.
========================================================== */

const name =
document.getElementById("name").value.trim();

const email =
document.getElementById("email").value.trim();

const phone =
document.getElementById("phone").value.trim();

const date =
document.getElementById("date").value;

const time =
document.getElementById("time").value;

const service =
document.getElementById("service").value;

const barber =
document.getElementById("barber").value;

const note =
document.getElementById("note").value.trim();



/* ==========================================================
   Validasi Form

   Jika ada data yang belum diisi,
   maka sistem akan menampilkan pesan
   kepada pengguna.
========================================================== */

if(name==""){

alert("Nama harus diisi.");

return;

}

if(email==""){

alert("Email harus diisi.");

return;

}

if(phone==""){

alert("Nomor HP harus diisi.");

return;

}

if(service==""){

alert("Silakan pilih layanan.");

return;

}

if(barber==""){

alert("Silakan pilih barber.");

return;

}



/* ==========================================================
   Membuat object booking.

   Object ini nantinya akan disimpan
   ke dalam Local Storage.
========================================================== */

const booking={

id:Date.now(),

name,

email,

phone,

date,

time,

service,

barber,

note

};



/* ==========================================================
   Menambahkan object booking
   ke dalam array bookings.
========================================================== */

bookings.push(booking);



/* ==========================================================
   Menyimpan array bookings
   ke Local Storage agar data
   tidak hilang ketika browser ditutup.
========================================================== */

localStorage.setItem(

"bookings",

JSON.stringify(bookings)

);



/* Memberikan notifikasi kepada pengguna */

alert("Booking berhasil ditambahkan.");



/* Mengosongkan kembali form */

form.reset();

});

}
/* ==========================================================
   BAGIAN 2
   Menampilkan Data Booking ke Tabel

   Fungsi ini akan membaca seluruh data
   yang ada di Local Storage kemudian
   menampilkannya ke tabel pada
   halaman bookings.html.
========================================================== */

function tampilkanBooking() {

    /* Jika halaman tidak memiliki tabel,
       maka fungsi dihentikan. */

    if (!table) return;

    /* Mengosongkan isi tabel terlebih dahulu
       agar data tidak tampil ganda. */

    table.innerHTML = "";

    /* Melakukan perulangan untuk setiap
       data booking yang tersimpan. */

    bookings.forEach((booking, index) => {

        table.innerHTML += `

        <tr>

            <td>${booking.name}</td>

            <td>${booking.email}</td>

            <td>${booking.phone}</td>

            <td>${booking.date}</td>

            <td>${booking.time}</td>

            <td>${booking.service}</td>

            <td>${booking.barber}</td>

            <td>${booking.note}</td>

            <td>

                <!-- =====================================
                     FITUR BARU UAS
                     Tombol Edit dan Delete
                ====================================== -->

                <button onclick="editBooking(${index})">

                    Edit

                </button>

                <button onclick="hapusBooking(${index})">

                    Hapus

                </button>

            </td>

        </tr>

        `;

    });

}


/* ==========================================================
   BAGIAN 3
   Menampilkan Total Booking

   Fungsi ini digunakan untuk
   menampilkan jumlah booking
   pada halaman Home.
========================================================== */

function updateBookingCount() {

    /* Jika elemen bookingCount
       tidak ditemukan,
       fungsi dihentikan. */

    if (!bookingCount) return;

    bookingCount.textContent = bookings.length;

}


/* ==========================================================
   Menjalankan fungsi ketika halaman
   pertama kali dibuka.
========================================================== */

tampilkanBooking();

updateBookingCount();
/* ==========================================================
   BAGIAN 4
   Menghapus Data Booking

   Fungsi ini dijalankan ketika
   tombol Hapus ditekan.
========================================================== */

function hapusBooking(index){

    /* Meminta konfirmasi kepada pengguna */

    let konfirmasi = confirm(
        "Apakah Anda yakin ingin menghapus data ini?"
    );

    /* Jika pengguna memilih Cancel,
       maka proses dihentikan */

    if(!konfirmasi){

        return;

    }

    /* Menghapus data sesuai index */

    bookings.splice(index,1);

    /* Menyimpan perubahan ke Local Storage */

    localStorage.setItem(
        "bookings",
        JSON.stringify(bookings)
    );

    /* Memperbarui tampilan tabel */

    tampilkanBooking();

    /* Memperbarui jumlah booking */

    updateBookingCount();

}



/* ==========================================================
   BAGIAN 5
   Edit Booking

   Fitur ini memungkinkan pengguna
   mengubah data booking.
========================================================== */

function editBooking(index){

    /* Mengambil data berdasarkan index */

    let booking = bookings[index];


    /* Meminta pengguna memasukkan
       data baru */

    let namaBaru = prompt(
        "Edit Nama",
        booking.name
    );

    if(namaBaru==null){

        return;

    }

    let emailBaru = prompt(
        "Edit Email",
        booking.email
    );

    if(emailBaru==null){

        return;

    }

    let hpBaru = prompt(
        "Edit Nomor HP",
        booking.phone
    );

    if(hpBaru==null){

        return;

    }


    /* Menyimpan perubahan */

    booking.name = namaBaru;

    booking.email = emailBaru;

    booking.phone = hpBaru;


    /* Update Local Storage */

    localStorage.setItem(

        "bookings",

        JSON.stringify(bookings)

    );


    /* Refresh tabel */

    tampilkanBooking();

}



/* ==========================================================
   BAGIAN 6
   Search Booking

   Digunakan untuk mencari data
   berdasarkan nama pelanggan.
========================================================== */

if(search){

search.addEventListener("keyup",function(){

    let keyword =
    search.value.toLowerCase();

    let baris =
    document.querySelectorAll("#table tr");


    baris.forEach(function(row){

        let nama =
        row.cells[0].innerText.toLowerCase();

        if(nama.includes(keyword)){

            row.style.display="";

        }

        else{

            row.style.display="none";

        }

    });

});

}