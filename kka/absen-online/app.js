document.addEventListener("DOMContentLoaded", function () {
    const cbx = document.getElementById("theme-cb"),
        cbx2 = document.getElementById("main-bd");
    cbx.checked = localStorage.getItem("clrTheme") === "true";
    cbx2.setAttribute("data-light", localStorage.getItem("clrTheme") === "true");
    cbx.addEventListener("change", function (event) {
        localStorage.setItem("clrTheme", event.currentTarget.checked);
        cbx2.setAttribute("data-light", event.currentTarget.checked);
    });

    var gpsloc = document.getElementById('lokasi');
    var startPos;
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            startPos = position;
            gpsloc.value = startPos.coords.latitude + ', ' + startPos.coords.longitude;
        }, function (error) {
            gpsloc.value = error.message;
        });
        navigator.geolocation.watchPosition(function (position) {
            gpsloc.value = position.coords.latitude + ', ' + position.coords.longitude;
        }, function (error) {
            gpsloc.value = error.message;
        });
    };
});
! function () {
    document.querySelector("style#nojs").innerHTML = ".no-js,.iframe-wrapper:before{display:none}.on-js{display:block}";
}();
! function () {
    var sket = document.getElementById("keterangan"),
        spres = document.getElementById("status"),
        ssuhu = document.getElementById("suhu"),
        snafas = document.getElementById("nafas");
    new SlimSelect({
        select: '#status',
        showSearch: false,
        showContent: 'down',
        onChange: (info) => {
            if (info.value == "Lainnya") {
                sket.required = true;
            } else {
                sket.required = false;
            };
        }
    });
    spres.slim.disable();
    new SlimSelect({
        select: '#suhu',
        showSearch: true,
        searchPlaceholder: 'Cari atau tambahkan pilihan...',
        allowDeselect: false,
        searchText: 'Kosong',
        searchingText: 'Proses...',
        searchFocus: true,
        showContent: 'down',
        addable: function (value) {
            return {
                text: value,
                value: value
            };
        }
    });
    ssuhu.slim.disable();
    new SlimSelect({
        select: '#nafas',
        showSearch: true,
        searchPlaceholder: 'Cari atau tambahkan pilihan...',
        allowDeselect: false,
        searchText: 'Kosong',
        searchingText: 'Proses...',
        searchFocus: true,
        showContent: 'down',
        addable: function (value) {
            return {
                text: value,
                value: value
            };
        }
    });
    snafas.slim.disable();
    new SlimSelect({
        select: '#laporan',
        showSearch: false,
        showContent: 'down',
        onChange: (info) => {
            if (info.value.match(/^(Kerja Dari Rumah|Dinas Luar Kantor|Dinas Di Kantor)$/)) {
                spres.slim.enable();
                spres.slim.setData([{
                    text: 'Mulai Bekerja'
                }, {
                    text: 'Selesai Bekerja'
                }, {
                    text: 'Mulai Istirahat'
                }, {
                    text: 'Selesai Istirahat'
                }, {
                    text: 'Mulai Lembur'
                }, {
                    text: 'Selesai Lembur'
                }, {
                    text: 'Lainnya'
                }]);
                spres.required = true;
                ssuhu.slim.setData([{
                    text: ''
                }]);
                snafas.slim.setData([{
                    text: ''
                }]);
                ssuhu.slim.disable();
                snafas.slim.disable();
            } else if (info.value == "Ijin Tidak Bekerja") {
                spres.slim.enable();
                spres.slim.setData([{
                    text: 'Sakit'
                }, {
                    text: 'Lainnya'
                }]);
                spres.required = true;
                ssuhu.slim.setData([{
                    text: ''
                }]);
                snafas.slim.setData([{
                    text: ''
                }]);
                ssuhu.slim.disable();
                snafas.slim.disable();
            } else if (info.value == "Ijin Pribadi Di Sela Bekerja") {
                spres.slim.enable();
                spres.slim.setData([{
                    text: 'Mulai Ijin'
                }, {
                    text: 'Selesai Ijin'
                }, {
                    text: 'Lainnya'
                }]);
                spres.required = true;
                ssuhu.slim.setData([{
                    text: ''
                }]);
                snafas.slim.setData([{
                    text: ''
                }]);
                ssuhu.slim.disable();
                snafas.slim.disable();
            } else if (info.value == "Isolasi Mandiri") {
                spres.slim.setData([{
                    text: ''
                }]);
                spres.slim.disable();
                spres.required = false;
                ssuhu.slim.enable();
                snafas.slim.enable();
                ssuhu.slim.setData([{
                    text: 'Normal, di bawah 37.2C'
                }]);
                snafas.slim.setData([{
                    text: 'Normal'
                }]);
                ssuhu.required = true;
                snafas.required = true;
            } else {
                spres.slim.setData([{
                    text: ''
                }]);
                ssuhu.slim.setData([{
                    text: ''
                }]);
                snafas.slim.setData([{
                    text: ''
                }]);
                spres.slim.disable();
                ssuhu.slim.disable();
                snafas.slim.disable();
                spres.required = false;
                ssuhu.required = false;
                snafas.required = false;
            };
            if (spres.value == "Lainnya") {
                sket.required = true;
            } else {
                sket.required = false;
            };
        }
    });
}();

var baca = new FileReader(),
    hasilBlob1 = document.getElementById("hasilblob1"),
    namaBlob1 = document.getElementById("namablob1"),
    mimeBlob1 = document.getElementById("mimeblob1"),
    extBlob1 = document.getElementById("extblob1"),
    hasilBlob2 = document.getElementById("hasilblob2"),
    namaBlob2 = document.getElementById("namablob2"),
    mimeBlob2 = document.getElementById("mimeblob2"),
    extBlob2 = document.getElementById("extblob2"),
    formAbsen = document.getElementById("absenvirtual"),
    statusProses = document.getElementById("proses"),
    inputSelfie = document.getElementById("fotoselfie"),
    inputDokumen = document.getElementById("fotodokumen"),
    tombolKirim = document.getElementById("kirim"),
    opsiLaporan = document.getElementById("laporan");

const appScript = "https://script.google.com/macros/s/AKfycbw9Fi8EtqcHShw14X8U7XRECYFKIGL-jeRlkZmqFqRqJLh5zkXxyCK2fmxEOf0fM2FE/exec";

function processBlob(fileInput, hasilBlob, mimeBlob, namaBlob, extBlob) {
    var inputFile = fileInput.files[0];
    if (inputFile) {
        tombolKirim.disabled = true;
        baca.fileName = inputFile.name;
        baca.onload = function (rfts) {
            var mmt = rfts.target.result.match(/^.*(?=;)/)[0];
            const imge = document.createElement("img");
            imge.src = rfts.target.result;
            imge.onload = function (e) {
                const cvs = document.createElement("canvas");
                const MAX_WIDTH = 200;
                const scaleSize = MAX_WIDTH / e.target.width;
                cvs.width = MAX_WIDTH;
                cvs.height = e.target.height * scaleSize;
                const ctx = cvs.getContext("2d");
                ctx.drawImage(e.target, 0, 0, cvs.width, cvs.height);
                const srce = ctx.canvas.toDataURL(e.target, mmt);
                hasilBlob.value = srce.replace(/^.*,/, '');
            };
            mimeBlob.value = mmt;
            namaBlob.value = rfts.target.fileName;
            extBlob.value = rfts.target.fileName.split('.').pop();
        };
        baca.readAsDataURL(inputFile);
        tombolKirim.disabled = false;
    } else {
        alert('Gambar Dihapus.');
    }
}

function createBlob1(input) {
    processBlob(input, hasilBlob1, mimeBlob1, namaBlob1, extBlob1);
};

function createBlob2(input) {
    processBlob(input, hasilBlob2, mimeBlob2, namaBlob2, extBlob2);
};

inputSelfie.addEventListener("change", function () {
    createBlob1(inputSelfie);
});

inputDokumen.addEventListener("change", function () {
    createBlob2(inputDokumen);
});

formAbsen.addEventListener("submit", async function (event) {
    event.preventDefault();
    inputSelfie.disabled = true;
    inputDokumen.disabled = true;

    statusProses.innerHTML = '<p>Harap menunggu, sedang mengirim....</p>';

    var formData = new FormData(formAbsen);
    var urlParameters = new URLSearchParams(formData).toString();

    try {
        tombolKirim.disabled = true;
        const response = await fetch(appScript, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: urlParameters
        });

        var responseText = await response.text();

        if (responseText) {
            statusProses.innerHTML = responseText;
        } else {
            statusProses.innerHTML = '<p>Terjadi kesalahan: Respons kosong dari server.</p>';
        }
    } catch (error) {
        console.error(error);
        alert("Terjadi kesalahan: " + error.message);
    } finally {
        formAbsen.reset();
        opsiLaporan.slim.set('');
        tombolKirim.disabled = false;
        inputSelfie.disabled = false;
        inputDokumen.disabled = false;
        statusProses.scrollIntoView({ behavior: 'smooth' });
    }
})