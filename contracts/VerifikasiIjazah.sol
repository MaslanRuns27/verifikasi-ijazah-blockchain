/// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract VerifikasiIjazah {

    struct Ijazah {
        string namaPemilik;
        string nim;
        string prodi;
        string tahunLulus;
        string hashIjazah;
        bool valid;
    }

    mapping(string => Ijazah) public dataIjazah;

    function tambahIjazah(
        string memory _nim,
        string memory _namaPemilik,
        string memory _prodi,
        string memory _tahunLulus,
        string memory _hashIjazah
    ) public {
        dataIjazah[_nim] = Ijazah(
            _namaPemilik,
            _nim,
            _prodi,
            _tahunLulus,
            _hashIjazah,
            true
        );
    }

    function verifikasiIjazah(
        string memory _nim,
        string memory _hashInput
    ) public view returns (bool) {

        return (
            keccak256(bytes(dataIjazah[_nim].hashIjazah)) ==
            keccak256(bytes(_hashInput))
        );
    }
}
