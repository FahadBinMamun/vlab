document.addEventListener("DOMContentLoaded", function() {
    if (!document.getElementById('periodic-table-container')) return;

    // Data is now embedded directly by PHP, use the global variable
    const periodicTableData = Promise.resolve(periodicTableJSON);

    Promise.all([periodicTableData, whenReady(THREE)])
        .then(([data]) => {
            initializePeriodicTable(data);
        })
        .catch(error => console.error("Initialization failed:", error));

    function whenReady(library) {
        return new Promise((resolve, reject) => {
            if (library) resolve();
            else reject("Required library (Three.js) not loaded");
        });
    }

    function initializePeriodicTable(periodicTableData) {
        const mainWrapper = document.getElementById('periodic-table-main');
        const fBlockWrapper = document.getElementById('periodic-table-f-block');
        const legendContainer = document.getElementById('pt-legend');
        const modal = document.getElementById('element-modal');
        const modalDetails = document.getElementById('element-details');
        const closeButton = document.querySelector('.close-button');
        const modelSwitchContainer = document.getElementById('atom-controls');

        const categories = {
            'alkali-metal': { name: 'ক্ষার ধাতু', color: '#ffadad' },
            'alkaline-earth-metal': { name: 'মৃৎক্ষার ধাতু', color: '#ffd6a5' },
            'lanthanide': { name: 'ল্যান্থানাইড', color: '#fdffb6' },
            'actinide': { name: 'অ্যাক্টিনাইড', color: '#caffbf' },
            'transition-metal': { name: 'অবস্থান্তর ধাতু', color: '#9bf6ff' },
            'post-transition-metal': { name: 'অবস্থান্তর-পরবর্তী ধাতু', color: '#a0c4ff' },
            'metalloid': { name: 'উপধাতু', color: '#bdb2ff' },
            'reactive-nonmetal': { name: 'অধাতু', color: '#ffc6ff' },
            'noble-gas': { name: 'নিষ্ক্রিয় গ্যাস', color: '#fffffc' },
            'unknown': { name: 'অজানা', color: '#e9ecef' }
        };

        // --- Legend & Filtering --- 
        Object.entries(categories).forEach(([key, cat]) => {
            const item = document.createElement('div');
            item.className = 'legend-item';
            item.dataset.category = key;
            item.innerHTML = `<div class="legend-color" style="background-color: ${cat.color};"></div><span class="legend-text">${cat.name}</span>`;
            item.addEventListener('click', () => toggleFilter(key));
            legendContainer.appendChild(item);
        });

        let activeFilter = null;
        function toggleFilter(categoryKey) {
            const allElements = document.querySelectorAll('.element');
            if (activeFilter === categoryKey) {
                activeFilter = null;
                allElements.forEach(el => el.classList.remove('dimmed'));
            } else {
                activeFilter = categoryKey;
                allElements.forEach(el => {
                    if (el.classList.contains(categoryKey.replace(/ /g, '-'))) {
                        el.classList.remove('dimmed');
                    } else {
                        el.classList.add('dimmed');
                    }
                });
            }
        }

        // --- Element Grid Creation --- 
        const elementPositions = { 1: { r: 1, c: 1 }, 2: { r: 1, c: 18 }, 3: { r: 2, c: 1 }, 4: { r: 2, c: 2 }, 5: { r: 2, c: 13 }, 6: { r: 2, c: 14 }, 7: { r: 2, c: 15 }, 8: { r: 2, c: 16 }, 9: { r: 2, c: 17 }, 10: { r: 2, c: 18 }, 11: { r: 3, c: 1 }, 12: { r: 3, c: 2 }, 13: { r: 3, c: 13 }, 14: { r: 3, c: 14 }, 15: { r: 3, c: 15 }, 16: { r: 3, c: 16 }, 17: { r: 3, c: 17 }, 18: { r: 3, c: 18 }, 19: { r: 4, c: 1 }, 20: { r: 4, c: 2 }, 21: { r: 4, c: 3 }, 22: { r: 4, c: 4 }, 23: { r: 4, c: 5 }, 24: { r: 4, c: 6 }, 25: { r: 4, c: 7 }, 26: { r: 4, c: 8 }, 27: { r: 4, c: 9 }, 28: { r: 4, c: 10 }, 29: { r: 4, c: 11 }, 30: { r: 4, c: 12 }, 31: { r: 4, c: 13 }, 32: { r: 4, c: 14 }, 33: { r: 4, c: 15 }, 34: { r: 4, c: 16 }, 35: { r: 4, c: 17 }, 36: { r: 4, c: 18 }, 37: { r: 5, c: 1 }, 38: { r: 5, c: 2 }, 39: { r: 5, c: 3 }, 40: { r: 5, c: 4 }, 41: { r: 5, c: 5 }, 42: { r: 5, c: 6 }, 43: { r: 5, c: 7 }, 44: { r: 5, c: 8 }, 45: { r: 5, c: 9 }, 46: { r: 5, c: 10 }, 47: { r: 5, c: 11 }, 48: { r: 5, c: 12 }, 49: { r: 5, c: 13 }, 50: { r: 5, c: 14 }, 51: { r: 5, c: 15 }, 52: { r: 5, c: 16 }, 53: { r: 5, c: 17 }, 54: { r: 5, c: 18 }, 55: { r: 6, c: 1 }, 56: { r: 6, c: 2 }, 57: { r: 9, c: 3 }, 58: { r: 9, c: 4 }, 59: { r: 9, c: 5 }, 60: { r: 9, c: 6 }, 61: { r: 9, c: 7 }, 62: { r: 9, c: 8 }, 63: { r: 9, c: 9 }, 64: { r: 9, c: 10 }, 65: { r: 9, c: 11 }, 66: { r: 9, c: 12 }, 67: { r: 9, c: 13 }, 68: { r: 9, c: 14 }, 69: { r: 9, c: 15 }, 70: { r: 9, c: 16 }, 71: { r: 9, c: 17 }, 72: { r: 6, c: 4 }, 73: { r: 6, c: 5 }, 74: { r: 6, c: 6 }, 75: { r: 6, c: 7 }, 76: { r: 6, c: 8 }, 77: { r: 6, c: 9 }, 78: { r: 6, c: 10 }, 79: { r: 6, c: 11 }, 80: { r: 6, c: 12 }, 81: { r: 6, c: 13 }, 82: { r: 6, c: 14 }, 83: { r: 6, c: 15 }, 84: { r: 6, c: 16 }, 85: { r: 6, c: 17 }, 86: { r: 6, c: 18 }, 87: { r: 7, c: 1 }, 88: { r: 7, c: 2 }, 89: { r: 10, c: 3 }, 90: { r: 10, c: 4 }, 91: { r: 10, c: 5 }, 92: { r: 10, c: 6 }, 93: { r: 10, c: 7 }, 94: { r: 10, c: 8 }, 95: { r: 10, c: 9 }, 96: { r: 10, c: 10 }, 97: { r: 10, c: 11 }, 98: { r: 10, c: 12 }, 99: { r: 10, c: 13 }, 100: { r: 10, c: 14 }, 101: { r: 10, c: 15 }, 102: { r: 10, c: 16 }, 103: { r: 10, c: 17 }, 104: { r: 7, c: 4 }, 105: { r: 7, c: 5 }, 106: { r: 7, c: 6 }, 107: { r: 7, c: 7 }, 108: { r: 7, c: 8 }, 109: { r: 7, c: 9 }, 110: { r: 7, c: 10 }, 111: { r: 7, c: 11 }, 112: { r: 7, c: 12 }, 113: { r: 7, c: 13 }, 114: { r: 7, c: 14 }, 115: { r: 7, c: 15 }, 116: { r: 7, c: 16 }, 117: { r: 7, c: 17 }, 118: { r: 7, c: 18 } };

        mainWrapper.innerHTML = ''; fBlockWrapper.innerHTML = '';
        mainWrapper.append(createPlaceholder('57-71', 6, 3, 'lanthanide-placeholder'));
        mainWrapper.append(createPlaceholder('89-103', 7, 3, 'actinide-placeholder'));

        periodicTableData.forEach(element => {
            const elDiv = createElementDiv(element);
            const pos = elementPositions[element.number];
            if(pos) {
                elDiv.style.gridRow = pos.r;
                elDiv.style.gridColumn = pos.c;
                if (pos.r > 8) { fBlockWrapper.appendChild(elDiv); }
                else { mainWrapper.appendChild(elDiv); }
            }
        });

        function createElementDiv(element) {
            const elDiv = document.createElement('div');
            elDiv.className = `element ${element.category.replace(/ /g, '-')}`;
            elDiv.innerHTML = `<div class="number">${element.number}</div>
                               <div class="symbol">${element.symbol}</div>
                               <div class="name">${element.name}</div>`;
            elDiv.addEventListener('click', () => showElementDetails(element));
            return elDiv;
        }
        function createPlaceholder(text, r, c, cls) {
            const placeholder = document.createElement('div');
            placeholder.className = cls;
            placeholder.innerText = text;
            placeholder.style.gridRow = r;
            placeholder.style.gridColumn = c;
            return placeholder;
        }

        // --- Modal & 3D Scene --- 
        let scene, camera, renderer, controls, animationId, currentGroup;
        let currentElementData = null;

        function showElementDetails(details) {
            currentElementData = details;
            modalDetails.innerHTML = `
                <div class="element-title" style="border-left: 5px solid ${categories[details.category.replace(/ /g, '-')]?.color || '#fff'}">
                    <h3>${details.name} (${details.symbol})</h3>
                    <span>${categories[details.category.replace(/ /g, '-')]?.name || 'অজানা'}</span>
                </div>
                <div class="tabs">
                    <button class="tab-link active" onclick="window.openTab(event, 'general')">সাধারণ</button>
                    <button class="tab-link" onclick="window.openTab(event, 'properties')">বৈশিষ্ট্য</button>
                    <button class="tab-link" onclick="window.openTab(event, 'history')">আবিষ্কার</button>
                </div>

                <div id="general" class="tab-content" style="display: block;">
                    <p>${details.summary || 'N/A'}</p>
                    <p><strong>ব্যবহার:</strong> ${details.uses || 'N/A'}</p>
                </div>

                <div id="properties" class="tab-content">
                    <div class="property-grid">
                        <p><strong>দশা:</strong> ${details.phase || 'N/A'}</p>
                        <p><strong>গলনাঙ্ক:</strong> ${details.melting_point ? details.melting_point + ' K' : 'N/A'}</p>
                        <p><strong>স্ফুটনাঙ্ক:</strong> ${details.boiling_point ? details.boiling_point + ' K' : 'N/A'}</p>
                        <p><strong>ঘনত্ব:</strong> ${details.density ? details.density + ' g/cm³' : 'N/A'}</p>
                        <p><strong>জারন অবস্থা:</strong> ${details.oxidation_states || 'N/A'}</p>
                        <p><strong>তড়িৎ ঋণাত্মকতা:</strong> ${details.electronegativity_pauling || 'N/A'}</p>
                        <p><strong>আয়নাইজিং শক্তি:</strong> ${details.ionization_energies?.[0] ? details.ionization_energies[0] + ' kJ/mol' : 'N/A'}</p>
                    </div>
                </div>

                <div id="history" class="tab-content">
                    <p><strong>আবিষ্কারক:</strong> ${details.discovered_by || 'N/A'}</p>
                </div>`;
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
            
            // Defer 3D initialization to prevent race conditions
            setTimeout(() => {
                if (!scene) {
                    init3DScene();
                } else {
                    // If scene exists, just switch model
                    switchModel('quantum');
                }
            }, 100);
        }

        function init3DScene() {
            console.log("Attempting to initialize 3D scene...");
            const canvasContainer = document.getElementById('atom-canvas-container');
            if (!canvasContainer) {
                console.error("Canvas container not found!");
                return;
            }

            try {
                scene = new THREE.Scene();
                camera = new THREE.PerspectiveCamera(60, canvasContainer.clientWidth / canvasContainer.clientHeight, 0.1, 1000);
                renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
                console.log("Renderer created successfully.");
            } catch (e) {
                console.error("Error creating WebGL renderer:", e);
                canvasContainer.innerHTML = '<div style="color: white; text-align: center; padding: 20px; font-family: sans-serif;'><h3>3D মডেল লোড করা যায়নি।</h3><p>আপনার ব্রাউজার WebGL সমর্থন করে না বা এটি নিষ্ক্রিয় করা আছে।</p></div>';
                return;
            }
            
            renderer.setSize(canvasContainer.clientWidth, canvasContainer.clientHeight);
            renderer.setPixelRatio(window.devicePixelRatio);
            canvasContainer.innerHTML = ''; // Clear any previous error messages
            canvasContainer.appendChild(renderer.domElement);

            controls = new THREE.OrbitControls(camera, renderer.domElement);
            controls.enableDamping = true;
            controls.dampingFactor = 0.05;
            controls.minDistance = 5;
            controls.maxDistance = 50;

            scene.add(new THREE.AmbientLight(0xffffff, 1.5));
            const dirLight = new THREE.DirectionalLight(0xffffff, 2.5);
            dirLight.position.set(5, 10, 7.5);
            scene.add(dirLight);

            const animate = () => {
                animationId = requestAnimationFrame(animate);
                controls.update();
                if (currentGroup) currentGroup.rotation.y += 0.001;
                renderer.render(scene, camera);
            };
            animate();
            console.log("Animation loop started.");

            // Initial model load
            switchModel('quantum');
        }

        function switchModel(modelType) {
            if (currentGroup) scene.remove(currentGroup);
            
            const modelCreators = {
                'quantum': createQuantumModel,
                'bohr': createBohrModel,
                'rutherford': createRutherfordModel
            };

            if(modelCreators[modelType]) {
                currentGroup = modelCreators[modelType](currentElementData);
                scene.add(currentGroup);
            }

            modelSwitchContainer.querySelectorAll('.control-btn').forEach(btn => {
                btn.classList.toggle('active', btn.dataset.model === modelType);
            });
        }

        modelSwitchContainer.addEventListener('click', (e) => {
            if (e.target.tagName === 'BUTTON') {
                switchModel(e.target.dataset.model);
            }
        });

        const materials = {
            proton: new THREE.MeshStandardMaterial({ color: 0xe74c3c, roughness: 0.4, metalness: 0.1 }),
            neutron: new THREE.MeshStandardMaterial({ color: 0x3498db, roughness: 0.4, metalness: 0.1 }),
            electron: new THREE.MeshStandardMaterial({ color: 0xf1c40f, emissive: 0xcc9900, roughness: 0.2, metalness: 0.8 }),
            orbit: new THREE.MeshBasicMaterial({ color: 0x999999, transparent: true, opacity: 0.3 })
        };

        function createNucleus(elementData) {
            const nucleusGroup = new THREE.Group();
            const protonCount = elementData.number;
            const neutronCount = Math.round(elementData.atomic_mass) - protonCount;
            const nucleusRadius = Math.cbrt(protonCount + neutronCount) * 0.3;
            const particleGeom = new THREE.SphereGeometry(0.2, 16, 16);

            for (let i = 0; i < protonCount + neutronCount; i++) {
                const isProton = i < protonCount;
                const particle = new THREE.Mesh(particleGeom, isProton ? materials.proton : materials.neutron);
                const r = Math.random() * nucleusRadius;
                const phi = Math.acos(2 * Math.random() - 1);
                const theta = Math.random() * 2 * Math.PI;
                particle.position.set(r * Math.sin(phi) * Math.cos(theta), r * Math.sin(phi) * Math.sin(theta), r * Math.cos(phi));
                nucleusGroup.add(particle);
            }
            return nucleusGroup;
        }

        function createQuantumModel(d) {
            const group = new THREE.Group();
            group.add(createNucleus(d));
            const electronGeom = new THREE.SphereGeometry(0.1, 16, 16);
            const cloudMaterial = new THREE.PointsMaterial({ color: 0xf1c40f, size: 0.05, transparent: true, opacity: 0.5 });
            const points = [];
            let electronsToPlace = d.number;
            const shells = [2, 8, 18, 32, 32, 18, 8];
            let shellRadius = 2;

            for (let i = 0; i < shells.length && electronsToPlace > 0; i++) {
                const electronsInShell = Math.min(electronsToPlace, shells[i]);
                for (let j = 0; j < electronsInShell * 100; j++) { // More points for denser cloud
                    const r = shellRadius + (Math.random() - 0.5) * (i + 1) * 0.5;
                    const phi = Math.acos(2 * Math.random() - 1);
                    const theta = Math.random() * 2 * Math.PI;
                    points.push(new THREE.Vector3(r * Math.sin(phi) * Math.cos(theta), r * Math.sin(phi) * Math.sin(theta), r * Math.cos(phi)));
                }
                electronsToPlace -= electronsInShell;
                shellRadius += 1.5;
            }
            const cloudGeom = new THREE.BufferGeometry().setFromPoints(points);
            const electronCloud = new THREE.Points(cloudGeom, cloudMaterial);
            group.add(electronCloud);
            camera.position.z = Math.max(15, shellRadius * 1.5);
            return group;
        }

        function createBohrModel(d) {
            const group = new THREE.Group();
            group.add(createNucleus(d));
            const electronGeom = new THREE.SphereGeometry(0.15, 16, 16);
            let electronsToPlace = d.number;
            const shells = [2, 8, 18, 32, 32, 18, 8];
            let shellRadius = 3;

            for (let i = 0; i < shells.length && electronsToPlace > 0; i++) {
                const electronsInShell = Math.min(electronsToPlace, shells[i]);
                const orbitGeom = new THREE.TorusGeometry(shellRadius, 0.02, 16, 100);
                const orbit = new THREE.Mesh(orbitGeom, materials.orbit);
                orbit.rotation.x = Math.PI / 2;
                group.add(orbit);

                for (let j = 0; j < electronsInShell; j++) {
                    const electron = new THREE.Mesh(electronGeom, materials.electron);
                    const angle = (j / electronsInShell) * Math.PI * 2;
                    electron.position.set(shellRadius * Math.cos(angle), 0, shellRadius * Math.sin(angle));
                    orbit.add(electron); // Attach to orbit to animate together
                }
                electronsToPlace -= electronsInShell;
                shellRadius += 1.5;
            }
            camera.position.z = Math.max(15, shellRadius * 1.5);
            return group;
        }

        function createRutherfordModel(d) {
            const group = new THREE.Group();
            group.add(createNucleus(d));
            const electronGeom = new THREE.SphereGeometry(0.05, 8, 8);
            for (let i = 0; i < d.number; i++) {
                const electron = new THREE.Mesh(electronGeom, materials.electron);
                const r = Math.random() * 10 + 3;
                const phi = Math.acos(2 * Math.random() - 1);
                const theta = Math.random() * 2 * Math.PI;
                electron.position.set(r * Math.sin(phi) * Math.cos(theta), r * Math.sin(phi) * Math.sin(theta), r * Math.cos(phi));
                group.add(electron);
            }
            camera.position.z = 20;
            return group;
        }

        const cleanup = () => {
            modal.style.display = 'none'; document.body.style.overflow = 'auto';
            if(currentGroup) scene.remove(currentGroup);
            currentElementData = null;
        };
        closeButton.addEventListener('click', cleanup);
        window.addEventListener('click', (event) => { if (event.target == modal) cleanup(); });

        window.openTab = (evt, tabName) => {
            let i, tabcontent, tablinks;
            tabcontent = modal.getElementsByClassName("tab-content");
            for (i = 0; i < tabcontent.length; i++) { tabcontent[i].style.display = "none"; }
            tablinks = modal.getElementsByClassName("tab-link");
            for (i = 0; i < tablinks.length; i++) { tablinks[i].className = tablinks[i].className.replace(" active", ""); }
            document.getElementById(tabName).style.display = "block";
            evt.currentTarget.className += " active";
        }
    }
});