# Algoritmo de Huffman

Este programa tiene como objetivo codificar un archivo de extensión .txt usando el algoritmo de huffman y posteriormente decodificar el código almacenado en un archivo binario. El resultado del texto codificado es almacenado en un archivo binario nombrado archivoCodificado.bin y los datos decodificados son almacenados en el archivo archivoDecodificado.txt. 

<h3>Prerrequisitos</h3>
Para ejecutar este proyecto debe contar con los siguientes prerrequisitos:

* Instalar NodeJS v16.x

* Instalar los siguientes paquetes:
<pre><code>npm install fs
npm install prompt-sync
</code></pre>
(fs) usado para la lectura y escritura de archivos empleados en el programa.
(prompt-sync) el programa solicita la ubicación del archivo a codificar y este método permite aceptar la entrada del usuario.

**Nota: Este proyecto cuenta con un archivo de ejemplo nombrado archivoInicial.txt**

<h3>Ejecución Algoritmo</h3>
Luego de cumplir con los prerrequisitos ejecute el programa con el siguiente comando:
<pre><code>node '.\Huffman.js'</code></pre>
