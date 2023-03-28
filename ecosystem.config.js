module.exports = {
    apps: [{
        name: "node-app",
        script: "src/App.js",
        instances: "max",
        exec_mode: "cluster"
    }]
}
