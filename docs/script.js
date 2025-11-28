// =============================
// CONFIG SMART CONTRACT
// =============================
const CONTRACT_ADDRESS = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
const ABI = [{
      "inputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "name": "dataIjazah",
      "outputs": [
        {
          "internalType": "string",
          "name": "namaPemilik",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "nim",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "prodi",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "tahunLulus",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "hashIjazah",
          "type": "string"
        },
        {
          "internalType": "bool",
          "name": "valid",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_nim",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_namaPemilik",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_prodi",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_tahunLulus",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_hashIjazah",
          "type": "string"
        }
      ],
      "name": "tambahIjazah",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_nim",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_hashInput",
          "type": "string"
        }
      ],
      "name": "verifikasiIjazah",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }];


// =============================
// TOAST NOTIFIKASI
// =============================
function showToast(message, type = "info") {
    const toast = document.getElementById("toast");

    const color = {
        success: "bg-green-600",
        error: "bg-red-600",
        info: "bg-blue-600",
        warning: "bg-yellow-600"
    };

    toast.className = `fixed bottom-5 right-5 px-5 py-3 rounded-xl shadow-xl text-white text-lg ${color[type]}`;
    toast.innerText = message;
    toast.style.opacity = "1";
    toast.classList.remove("hidden");

    setTimeout(() => {
        toast.style.opacity = "0";
        setTimeout(() => toast.classList.add("hidden"), 500);
    }, 2500);
}


// =============================
// LOADING SPINNER
// =============================
function showSpinner() {
    document.getElementById("spinner").classList.remove("hidden");
}
function hideSpinner() {
    document.getElementById("spinner").classList.add("hidden");
}


// =============================
// LOGIN METAMASK
// =============================
async function connectWallet() {
    if (!window.ethereum) {
        showToast("MetaMask tidak ditemukan!", "error");
        return;
    }

    try {
        const accounts = await ethereum.request({ method: "eth_requestAccounts" });
        const wallet = accounts[0];

        document.getElementById("walletAddress").innerText = "Terhubung: " + wallet;
        enableButtons();
        showToast("Berhasil login MetaMask!", "success");

        await ensureLocalNetwork();

    } catch (err) {
        console.error(err);
        showToast("Gagal login MetaMask!", "error");
    }
}


// =============================
// AUTO NETWORK (HARUS 31337)
// =============================
async function ensureLocalNetwork() {
    const chainId = await ethereum.request({ method: "eth_chainId" });

    if (chainId !== "0x7a69") {  // 31337 dalam hex
        showToast("Jaringan salah! Pindah ke Hardhat Localhost!", "warning");

        try {
            await ethereum.request({
                method: "wallet_switchEthereumChain",
                params: [{ chainId: "0x7a69" }]
            });

            showToast("Berhasil pindah jaringan!", "success");

        } catch (switchError) {
            showToast("Tidak bisa pindah jaringan otomatis", "error");
        }
    }
}


// =============================
// ENABLE BUTTONS
// =============================
function enableButtons() {
    const buttons = [
        { id: "btnUpload", active: "bg-blue-600 hover:bg-blue-700" },
        { id: "btnVerif", active: "bg-green-600 hover:bg-green-700" }
    ];

    buttons.forEach(btn => {
        const el = document.getElementById(btn.id);
        el.disabled = false;
        el.classList.remove("opacity-50", "cursor-not-allowed");
        el.classList.add(...btn.active.split(" "));
    });
}


// =============================
// HASH FILE
// =============================
async function generateHash(file) {
    const buffer = await file.arrayBuffer();
    const hash = await crypto.subtle.digest("SHA-256", buffer);
    return Array.from(new Uint8Array(hash))
        .map(b => b.toString(16).padStart(2, "0"))
        .join("");
}


// =============================
// SIMPAN IJAZAH
// =============================
async function uploadIjazah() {

    if (!window.ethereum.selectedAddress)
        return showToast("Login MetaMask dulu!", "warning");

    const file = document.getElementById("pdfInput").files[0];
    if (!file) return showToast("Upload file ijazah dulu!", "warning");

    const nim = document.getElementById("nim").value;
    if (!nim) return showToast("NIM tidak boleh kosong!", "warning");

    showSpinner();

    try {
        const hash = await generateHash(file);

        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);

        const tx = await contract.tambahIjazah(
            nim,
            document.getElementById("nama").value,
            document.getElementById("prodi").value,
            document.getElementById("tahun").value,
            hash
        );

        showToast("Menyimpan ke blockchain...", "info");

        await tx.wait();

        showToast("Berhasil disimpan! TX: " + tx.hash.slice(0, 15) + "...", "success");

    } catch (e) {
        console.error(e);
        showToast("Gagal menyimpan ijazah!", "error");

    } finally {
        hideSpinner();
    }
}


// =============================
// VERIFIKASI IJAZAH
// =============================
async function verifikasi() {

    if (!window.ethereum.selectedAddress)
        return showToast("Login MetaMask dulu!", "warning");

    const file = document.getElementById("pdfVerif").files[0];
    if (!file) return showToast("Upload file untuk verifikasi!", "warning");

    const nim = document.getElementById("nimVerif").value;
    if (!nim) return showToast("NIM tidak boleh kosong!", "warning");

    showSpinner();

    try {
        const hash = await generateHash(file);

        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);

        const isValid = await contract.verifikasiIjazah(nim, hash);

        if (isValid)
            showToast("IJAZAH VALID ✔", "success");
        else
            showToast("IJAZAH TIDAK VALID ✘", "error");

    } catch (e) {
        console.error(e);
        showToast("Error verifikasi!", "error");

    } finally {
        hideSpinner();
    }
}
