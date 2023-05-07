const fs = require('fs');

// Leer el archivo inicial
const originalFile = fs.readFileSync('archivoInicial.txt', 'utf8');

// Construir una tabla (objeto) con la frecuencia de los caracteres contenidos en archivo.txt.
const freqTable = {};
for (let char of originalFile) {
    freqTable[char] = freqTable[char] + 1 || 1;
}

// Constructor Node
class Node {
    constructor(char, freq) {
        this.char = char;
        this.freq = freq;
        this.left = null;
        this.right = null;
    }
}

// Construir el árbol de Huffman
// Ingresar todos los nodos al árbol, con el caracter y frecuencia correspondiente.
const tree = [];
for (const char in freqTable) {
    tree.push(new Node(char, freqTable[char]));
}

// Ordenar el árbol 
while (tree.length > 1) {
    tree.sort((a, b) => a.freq - b.freq);
    const left = tree.shift();
    const right = tree.shift();
    const parent = new Node(null, left.freq + right.freq);
    parent.left = left;
    parent.right = right;
    tree.push(parent);
}
const root = tree[0];


// Codificar cada caracter del texto usando la codificación de Huffman
// encode: objeto con caracter: 1s y 0s, según la codificación de Huffman
const encode = {};

function encodeChar(node, code) {
    if (node.char !== null) {
        encode[node.char] = code;
    } else {
        encodeChar(node.left, code + '0'); // Todo a la izquierda 0
        encodeChar(node.right, code + '1'); // Todo a la derecha 1
    }
}
encodeChar(root, '');

// Formar el mensaje del texto usando los caracteres codificados
let encodedData = '';
for (let char of originalFile) {
    encodedData += encode[char];
}

// Añadir ceros adicionales para que la longitud de los datos codificados sea múltiplo de 8
while (encodedData.length % 8 !== 0) {
    encodedData += '0';
}

// Convertir los datos codificados a binarios en una matriz de enteros de 8 bits (Uint8Array).
let binaryData = new Uint8Array(encodedData.match(/.{1,8}/g).map(byte => parseInt(byte, 2)));

// Escribir los datos binarios en el archivo
fs.writeFileSync('archivoCodificado.bin', binaryData);

// Leer archivo binario "archivoCodificado.bin"
const binaryDataRead = fs.readFileSync('archivoCodificado.bin');

// Convertir los datos binarios a los datos codificados
let binaryDataDecode = '';
for (const byte of binaryDataRead) {
    binaryDataDecode += byte.toString(2).padStart(8, '0');
}

// Remover los ceros añadidos a la data codificada
while (binaryDataDecode[binaryDataDecode.length - 1] === '0') {
    binaryDataDecode = binaryDataDecode.slice(0, -1);
}

// Decodificar usando el árbol de Huffman
let currentNode = root;
let decodedData = '';
// Recorrer datos codificados 
for (let i = 0; i < binaryDataDecode.length; i++) {
    currentNode = binaryDataDecode[i] === '0' ? currentNode.left : currentNode.right;

    if (!currentNode.left && !currentNode.right) {
        // Nodo hoja, se añade el caracter decodificado a decodedData
        decodedData += currentNode.char;
        currentNode = root; // Reiniciar el nodo actual
    }
}

// Escribir los datos decodificados en el archivo "archivoDecodificado.txt"
fs.writeFileSync('archivoDecodificado.txt', decodedData, 'utf8');