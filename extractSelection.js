const fs = require('fs')

// Remove file directory and extension
function pruneFile(file, dir) {
    const noExtension = file.slice(0, -4);
    const dirNameLength = dir.length + 1;
    const noDir = noExtension.substring(dirNameLength);
    return noDir;
}

// Copy file from one dir to another
function copyFile(src_, dest_) {
    const src = './' + src_;
    const dest = './' + dest_;
    console.log(`Copying ${src} to ${dest}`)
    fs.writeFileSync(dest, fs.readFileSync(src), (err) => {
        if (err) throw err;
    });
}

// Read all files from a directory
function getSelectedFiles (dir, files_){
    files_ = files_ || [];
    var files = fs.readdirSync(dir);
    for (var i in files){
        var name = dir + '/' + files[i];
       
        files_.push(name);
    }
    return files_;
}

// Extract array of 'selected jpg files' from nef collection
const selectedFiles = getSelectedFiles('selected')

// Move selected files into output/
function moveSelected(dir, selectedFiles) {
    var files = fs.readdirSync(dir);

    for (var i in files){
        var name = dir + '/' + files[i];
        prunedFile = pruneFile(name, 'nef');

        selectedFileIndex = selectedFiles.indexOf('selected/' + prunedFile + '.jpg');
        
        if (selectedFileIndex !== -1) {
            let output = 'output/' + prunedFile + '.nef';
            copyFile(name, output);
        }
    }
}


// Main function call
moveSelected('nef', selectedFiles);
console.log('Copying complete.')
