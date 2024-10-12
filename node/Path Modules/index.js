import path from "path";

// console.log(path);
console.log(path.basename("C:\\temp\\myfile.html"));
console.log(path.basename("C:\\temp\\myfile.html", ".html"));
console.log(path.basename("C:\\temp\\myfile.html", ".HTML"));
console.log(path.dirname("C:\\temp\\myfile.html"));
console.log(path.extname("C:\\temp\\myfile.html"));
console.log(path.isAbsolute("C:\\temp\\myfile.html"));
console.log(path.isAbsolute("temp\\myfile.html"));
console.log(path.join("C:\\temp", "myfile.html"));
console.log(path.join("C:\\temp", "myDir", "myFile.html"));
console.log(
  path.join("C:\\temp", "myDir", "myFile.html", "..", "anotherFile.html")
);
console.log(
  path.join("C:\\temp", "myDir", "myFile.html", "..", "anotherFile.html", ".")
);
console.log(path.parse("C:\\temp\\courses\\myfile.html"));
console.log(path.parse("C:\\temp\\courses\\myfile.html").base);
console.log(path.parse("C:\\temp\\courses\\myfile.html").dir);
console.log(path.parse("C:\\temp\\courses\\myfile.html").ext);
console.log(path.normalize("C:\\temp\\courses\\myfile.html"));
