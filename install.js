module.exports = {
  "cmds": {
    "nvidia": "pip install torch torchvision torchaudio xformers --index-url https://download.pytorch.org/whl/cu118",
    "amd": "pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/rocm5.6",
    "default": "pip3 install --pre torch torchvision torchaudio --index-url https://download.pytorch.org/whl/nightly/cpu"
  },
  "run": [{
    "method": "shell.run",
    "params": {
      "message": "git clone https://huggingface.co/spaces/cocktailpeanut/BRIA-RMBG-1.4 app"
    }
  }, {
    "method": "shell.run",
    "params": {
      "venv": "env",
      "path": "app",
      "message": [
        "{{(gpu === 'nvidia' ? self.cmds.nvidia : ((gpu === 'amd' && platform === 'linux') ? self.cmds.amd : self.cmds.default))}}",
        "pip install -r requirements.txt",
      ]
    }
  }, {
    "method": "fs.share",
    "params": {
      "venv": "app/env"
    }
  }, {
    "method": "notify",
    "params": {
      "html": "Click the 'start' tab to get started!"
    }
  }]
}
