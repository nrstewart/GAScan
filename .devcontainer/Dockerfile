# Use the official Node.js LTS image as base
FROM "mcr.microsoft.com/devcontainers/typescript-node:1-22-bookworm"

# Install system dependencies
RUN apt-get update && apt-get install -y \
    curl \
    wget \
    gnupg \
    software-properties-common \
    && rm -rf /var/lib/apt/lists/*

# Install 1Password CLI
RUN curl -sS https://downloads.1password.com/linux/keys/1password.asc | \
    gpg --dearmor --output /usr/share/keyrings/1password-archive-keyring.gpg && \
    echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/1password-archive-keyring.gpg] https://downloads.1password.com/linux/debian/$(dpkg --print-architecture) stable main" | \
    tee /etc/apt/sources.list.d/1password.list && \
    mkdir -p /etc/debsig/policies/AC2D62742012EA22/ && \
    curl -sS https://downloads.1password.com/linux/debian/debsig/1password.pol | \
    tee /etc/debsig/policies/AC2D62742012EA22/1password.pol && \
    mkdir -p /usr/share/debsig/keyrings/AC2D62742012EA22 && \
    curl -sS https://downloads.1password.com/linux/keys/1password.asc | \
    gpg --dearmor --output /usr/share/debsig/keyrings/AC2D62742012EA22/debsig.gpg && \
    apt-get update && apt-get install -y 1password-cli

# Install Google Apps Script CLI (CLASP) globally
RUN npm install -g @google/clasp

# Install ESLint
RUN npm install -g eslint

# Install Gemini CLI (Google AI CLI)
RUN curl -o /usr/local/bin/gemini https://ai.google.dev/cli/gemini && \
    chmod +x /usr/local/bin/gemini

# Install Zsh and Oh My Zsh
RUN apt-get update && apt-get install -y zsh git

ARG USERNAME=vscode
ARG USER_UID=1010
ARG USER_GID=$USER_UID
# Create the user
RUN groupadd --gid $USER_GID $USERNAME \
    && useradd --uid $USER_UID --gid $USER_GID -m $USERNAME -s /bin/zsh \
    #
    # [Optional] Add sudo support. Omit if you don't need to install software after connecting.
    && apt-get update \
    && apt-get install -y sudo \
    && echo $USERNAME ALL=\(root\) NOPASSWD:ALL > /etc/sudoers.d/$USERNAME \
    && chmod 0440 /etc/sudoers.d/$USERNAME

# Switch to user for Oh My Zsh installation
USER $USERNAME

# Install Oh My Zsh and configure theme
RUN sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)" "" --unattended \
    && git clone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions \
    && git clone https://github.com/zsh-users/zsh-syntax-highlighting ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting

# Configure .zshrc with user-friendly settings
RUN echo 'export ZSH="$HOME/.oh-my-zsh"' > ~/.zshrc \
    && echo 'ZSH_THEME="agnoster"' >> ~/.zshrc \
    && echo 'plugins=(git node npm docker vscode zsh-autosuggestions zsh-syntax-highlighting)' >> ~/.zshrc \
    && echo 'source $ZSH/oh-my-zsh.sh' >> ~/.zshrc \
    && echo '' >> ~/.zshrc \
    && echo '# Custom aliases for Google Apps Script development' >> ~/.zshrc \
    && echo 'alias gas-build="npm run build"' >> ~/.zshrc \
    && echo 'alias gas-push="npm run clasp:push"' >> ~/.zshrc \
    && echo 'alias gas-deploy="npm run clasp:deploy"' >> ~/.zshrc \
    && echo 'alias gas-open="npm run clasp:open"' >> ~/.zshrc \
    && echo 'alias gas-dev="npm run dev"' >> ~/.zshrc \
    && echo 'alias gas-login="npm run clasp:login"' >> ~/.zshrc \
    && echo 'alias gas-lint="npm run lint"' >> ~/.zshrc \
    && echo 'alias gas-format="npm run format"' >> ~/.zshrc \
    && echo '' >> ~/.zshrc \
    && echo '# Development helpers' >> ~/.zshrc \
    && echo 'alias ll="ls -alF"' >> ~/.zshrc \
    && echo 'alias la="ls -A"' >> ~/.zshrc \
    && echo 'alias l="ls -CF"' >> ~/.zshrc \
    && echo 'alias ..="cd .."' >> ~/.zshrc \
    && echo 'alias ...="cd ../.."' >> ~/.zshrc \
    && echo '' >> ~/.zshrc \
    && echo '# Welcome message' >> ~/.zshrc \
    && echo 'echo "🚀 Google Apps Script DevContainer Ready!"' >> ~/.zshrc \
    && echo 'echo "Use gas-* aliases for quick development commands"' >> ~/.zshrc \
    && echo 'echo "Type '\''gas-login'\'' to authenticate with Google Apps Script"' >> ~/.zshrc

# Set default shell
SHELL ["/bin/zsh", "-c"]
