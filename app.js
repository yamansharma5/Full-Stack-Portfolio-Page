// =====================================
// === Responsive Hamburger Navigation ===
// =====================================
document.addEventListener('DOMContentLoaded', () => {
    
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links li');

    // Add a click event listener to the hamburger icon
    hamburger.addEventListener('click', () => {
        // Toggle the 'nav-active' class to show/hide the navigation menu
        navLinks.classList.toggle('nav-active');

        // Animate the links to fade in
        links.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = ''; // Clear animation to allow it to run again
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });
        
        // Toggle the hamburger icon animation (to "X")
        hamburger.classList.toggle('toggle');
    });

});

// Add this inside your DOMContentLoaded listener
document.addEventListener('DOMContentLoaded', () => {
    
    // ... (your existing hamburger, dark mode, etc. code) ...

    // =============================
    // === Interactive Terminal  ===
    // =============================
    const terminalBody = document.getElementById('terminal-body');
    const commandInput = document.getElementById('command-input');

    // Only run the terminal script if the elements exist on the page
    if (terminalBody && commandInput) {
        const commandHistory = [];
        let historyIndex = -1;
    
        // Autofocus the input on any click in the terminal window
        terminalBody.addEventListener('click', () => {
            commandInput.focus();
        });

        commandInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                const command = commandInput.value.trim().toLowerCase();
                if (command) {
                    // Add to history
                    commandHistory.push(command);
                    historyIndex = commandHistory.length;
                    
                    // Echo the command
                    printLine(`<span class="prompt-user">guest@yaman-portfolio:~$</span> <span class="output-command">${command}</span>`);
                    
                    // Process the command
                    processCommand(command);
                    
                    commandInput.value = '';
                }
            } else if (e.key === 'ArrowUp') {
                if (historyIndex > 0) {
                    historyIndex--;
                    commandInput.value = commandHistory[historyIndex];
                }
            } else if (e.key === 'ArrowDown') {
                if (historyIndex < commandHistory.length - 1) {
                    historyIndex++;
                    commandInput.value = commandHistory[historyIndex];
                } else {
                    // Clear the input if at the end of history
                    historyIndex = commandHistory.length;
                    commandInput.value = '';
                }
            }
        });

        function processCommand(command) {
            let output = '';
            switch (command) {
                case 'help':
                    output = `Available commands:
  <span class="command-highlight">about</span>      - Shows a summary about me
  <span class="command-highlight">skills</span>     - Lists my technical skills
  <span class="command-highlight">projects</span>   - Displays my key projects
  <span class="command-highlight">contact</span>    - Shows my contact information
  <span class="command-highlight">socials</span>    - Links to my social media profiles
  <span class="command-highlight">date</span>       - Displays the current date and time
  <span class="command-highlight">clear</span>      - Clears the terminal screen`;
                    break;
                case 'about':
                    output = 'As a passionate software engineer based in Jaipur, I specialize in creating modern and responsive websites. I thrive on writing clean code, designing great user experiences, and continuously learning new technologies.';
                    break;
                case 'skills':
                    output = `My Skills Include:
- Languages: JavaScript (ES6+), HTML5, CSS3, SQL
- Frameworks: React, Node.js, Express.js
- Tools: Git, GitHub, VS Code, Figma, AWS`;
                    break;
                case 'projects':
                    output = `Here are some of my projects:
- <a href="projects.html" target="_blank">Project 1: E-commerce Site</a> - A full-stack retail platform.
- <a href="#" target="_blank">Project 2: Portfolio Website</a> - The very site you are on!`;
                    break;
                case 'contact':
                    output = `You can reach me at: <a href="mailto:sharma.yaman@example.com">sharma.yaman@example.com</a>`;
                    break;
                case 'socials':
                    output = `Find me on:
- <a href="https://github.com/your-username-here" target="_blank">GitHub</a>
- <a href="https://linkedin.com/in/yourprofile" target="_blank">LinkedIn</a>`;
                    break;
               
                case 'sudo':
                    output = 'user is not in the sudoers file. This incident will be reported.';
                    break;
                case 'clear':
                    terminalBody.innerHTML = ''; // Clears all lines
                    return; // Stop further processing
                default:
                    output = `command not found: ${command}. Type 'help' for a list of commands.`;
            }
            printLine(`<div class="command-output">${output}</div>`);
        }

        function printLine(text) {
            const promptLine = document.querySelector('.prompt-line');
            const newLine = document.createElement('div');
            newLine.classList.add('terminal-line');
            newLine.innerHTML = text;
            
            // Insert the new line before the prompt line
            terminalBody.insertBefore(newLine, promptLine);
            
            // Scroll to the bottom
            terminalBody.scrollTop = terminalBody.scrollHeight;
        }
    }
});