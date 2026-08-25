let currentUser = null;

//SIDEBAR FUNCTION
    function showSection(sectionId) {
      document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
      });
      document.getElementById(sectionId).classList.add('active');
      if (sectionId === 'announcements') loadAnnouncements();
      if (sectionId === 'exam-requests') loadExamRequests();
      if (sectionId === 'medical-requests') loadMedicalRequests();
      if (sectionId === 'results') loadResults();
    }

//LOCAL STORAGE
    function initLocalStorage() {
      if (!localStorage.getItem('students')) localStorage.setItem('students', JSON.stringify([]));
      if (!localStorage.getItem('announcements')) localStorage.setItem('announcements', JSON.stringify([]));
      if (!localStorage.getItem('examRequests')) localStorage.setItem('examRequests', JSON.stringify([]));
      if (!localStorage.getItem('medicalRequests')) localStorage.setItem('medicalRequests', JSON.stringify([]));
      if (!localStorage.getItem('results')) localStorage.setItem('results', JSON.stringify([]));
    }

//ANNOUNCMENTS
      function postAnnouncement() {
        const title = document.getElementById('announcement-title').value;
        const content = document.getElementById('announcement-content').value;
        if (title && content) {
          let announcements = JSON.parse(localStorage.getItem('announcements') || '[]');
          announcements.push({ title, content, date: new Date().toISOString() });
          localStorage.setItem('announcements', JSON.stringify(announcements));
          loadAnnouncements();
          document.getElementById('announcement-title').value = '';
          document.getElementById('announcement-content').value = '';
        } else {
          alert('Please fill in all fields!');
        }
      }

      function loadAnnouncements() {
        const announcements = JSON.parse(localStorage.getItem('announcements') || '[]');
        const list = document.getElementById('announcement-list');
        list.innerHTML = '';
        announcements.forEach((announcement, index) => {
          const div = document.createElement('div');
          div.className = 'event-card';
          div.innerHTML = `
            <div class="event-header">
              <h3>${announcement.title}</h3>
              <span class="event-date">${new Date(announcement.date).toLocaleDateString()}</span>
            </div>
            <div class="event-content">
              <p>${announcement.content}</p>
            </div>
            <button onclick="deleteAnnouncement(${index})">Delete</button>
          `;
          list.appendChild(div);
        });
      }
      //DELETE ANNOUNCMENT
      function deleteAnnouncement(index) {
        let announcements = JSON.parse(localStorage.getItem('announcements') || '[]');
        announcements.splice(index, 1);
        localStorage.setItem('announcements', JSON.stringify(announcements));
        loadAnnouncements();
        alert('Announcement deleted successfully!');
      }

//LOAD STUDENTS
      function loadStudents() {
        const statusFilter = document.getElementById('statusFilter').value;
        let students = JSON.parse(localStorage.getItem('students') || '[]');
        if (statusFilter) {
          students = students.filter(student => student.status === statusFilter);
        }
        const tableBody = document.getElementById('studentTableBody');
        tableBody.innerHTML = '';
        students.forEach(student => {
          const row = document.createElement('tr');
          row.innerHTML = `
            <td>${student.registrationId}</td>
            <td>${student.name}</td>
            <td>${student.department}</td>
            <td>${student.batch}</td>
            <td>${student.year}</td>
            <td>${student.semester}</td>
            <td>${student.status}</td>
            <td><button onclick="deleteStudent(this)">Delete</button></td>
          `;
          tableBody.appendChild(row);
        });
      }

// ADD STUDENTS
        function addStudent() {
          document.getElementById('add-student-form').style.display = 'block';
        }

        function saveStudent() {
          const registrationId = document.getElementById('registrationId').value;
          const studentName = document.getElementById('studentName').value;
          const studentDepartment = document.getElementById('studentDepartment').value;
          const studentBatch = document.getElementById('studentBatch').value;
          const studentYear = document.getElementById('studentYear').value;
          const studentSemester = document.getElementById('studentSemester').value;
          const studentStatus = document.getElementById('studentStatus').value;

          if (registrationId && studentName && studentDepartment && studentBatch && studentYear && studentSemester && studentStatus) {
            let students = JSON.parse(localStorage.getItem('students') || '[]');
            students.push({
              registrationId,
              name: studentName,
              department: studentDepartment,
              batch: studentBatch,
              year: studentYear,
              semester: studentSemester,
              status: studentStatus
            });
            localStorage.setItem('students', JSON.stringify(students));
            loadStudents();
            document.getElementById('add-student-form').reset();
            document.getElementById('add-student-form').style.display = 'none';
          } else {
            alert('Please fill in all fields!');
          }
        }

        function cancelAddStudent() {
          document.getElementById('add-student-form').style.display = 'none';
        }

        function deleteStudent(button) {
          const row = button.closest('tr');
          const registrationId = row.cells[0].textContent;
          let students = JSON.parse(localStorage.getItem('students') || '[]');
          students = students.filter(student => student.registrationId !== registrationId);
          localStorage.setItem('students', JSON.stringify(students));
          loadStudents();
        }

//EXAM REQUESTS
      function loadExamRequests() {
        const requests = JSON.parse(localStorage.getItem('examRequests') || '[]');
        const tableBody = document.getElementById('examRequestTableBody');
        tableBody.innerHTML = '';
        requests.forEach(request => {
          const row = document.createElement('tr');
          row.innerHTML = `
            <td>${request.registrationNumber}</td>
            <td>${request.studentName}</td>
            <td>${request.course}</td>
            <td>${request.year}</td>
            <td>${request.semester}</td>
            <td>${request.subjects.map(s => `${s.subject} (${s.remainingAttempts})`).join('<br>')}</td>
            <td>
              <button>Approve</button>
              <button>Decline</button>
            </td>
          `;
          tableBody.appendChild(row);
        });
      }

      function approve() {
      alert('Request is Approved');
      }

      function decline() {
      alert('Request is Declined');
      }
    

//MEDICAL
    function loadMedicalRequests() {
      const requests = JSON.parse(localStorage.getItem('medicalRequests') || '[]');
      const tableBody = document.getElementById('medicalRequestTableBody');
      tableBody.innerHTML = '';
      requests.forEach(request => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${request.registrationNumber}</td>
          <td>${request.studentName}</td>
          <td>${request.course}</td>
          <td>${request.subject}</td>
          <td>${request.examDate}</td>
          <td>${request.medicalType}</td>
          <td>${request.issueDate}</td>
          <td>
              <button>Approve</button>
              <button>Decline</button>
          </td>
        `;
        tableBody.appendChild(row);
      });
    }
    
//RESULTS UPLOAD
    document.addEventListener('DOMContentLoaded', function() {
          window.uploadResults = function() {
              const fileInput = document.getElementById('resultFile');
              const file = fileInput.files[0];
              if (!file) {
                  alert('Please select a file to upload.');
                  return;
              }

              const reader = new FileReader();
              reader.onload = function(e) {
                  const fileType = file.name.endsWith('.pdf') ? 'pdf' : 'excel';
                  if (fileType === 'pdf') {
                      localStorage.setItem('resultsData', JSON.stringify({
                          fileType: 'pdf',
                          fileUrl: e.target.result
                      }));
                      loadResults();
                  } else if (fileType === 'excel') {
                      parseExcel(file, function(data) {
                          localStorage.setItem('resultsData', JSON.stringify({
                              fileType: 'excel',
                              headers: data.headers,
                              rows: data.rows
                          }));
                          loadResults();
                      });
                  }
              };

              if (file.name.endsWith('.pdf')) {
                  reader.readAsDataURL(file);
              } else {
                  reader.readAsArrayBuffer(file);
              }
          };
          function parseExcel(file, callback) {
              const reader = new FileReader();
              reader.onload = function(e) {
                  const data = new Uint8Array(e.target.result);
                  const workbook = XLSX.read(data, { type: 'array' });
                  const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
                  const jsonData = XLSX.utils.sheet_to_json(firstSheet, { header: 1 });
                  const headers = jsonData[0];
                  const rows = jsonData.slice(1).filter(row => row.some(cell => cell)); // Remove empty rows
                  callback({ headers, rows });
              };
              reader.readAsArrayBuffer(file);
          }
          function loadResults() {
              const resultsData = localStorage.getItem('resultsData');
              if (!resultsData) return;

              const data = JSON.parse(resultsData);
              const resultsDiv = document.getElementById('results');
              while (resultsDiv.children.length > 1) {
                  resultsDiv.removeChild(resultsDiv.lastChild);
              }

              if (data.fileType === 'pdf') {
                  const embed = document.createElement('embed');
                  embed.src = data.fileUrl;
                  embed.width = '100%';
                  embed.height = '500px';
                  resultsDiv.appendChild(embed);
              } else if (data.fileType === 'excel') {
                  const table = document.createElement('table');
                  table.className = 'results-table';
                  const thead = document.createElement('thead');
                  const headerRow = document.createElement('tr');
                  data.headers.forEach(header => {
                      const th = document.createElement('th');
                      th.textContent = header;
                      headerRow.appendChild(th);
                  });
                  thead.appendChild(headerRow);
                  table.appendChild(thead);
                  const tbody = document.createElement('tbody');
                  data.rows.forEach(row => {
                      const tr = document.createElement('tr');
                      row.forEach(cell => {
                          const td = document.createElement('td');
                          td.textContent = cell || ''; 
                          tr.appendChild(td);
                      });
                      tbody.appendChild(tr);
                  });
                  table.appendChild(tbody);

                  resultsDiv.appendChild(table);
              }
          }
          loadResults();
      });    
      
//ACCOUNT 
    function saveUsername() {
      alert('Username saved');
    }

    function savePassword() {
      alert('Password saved');
    }

    function deactivateAccount() {
      alert('Account deactivated');
    }

//LOGOUT
    function logout() {
      currentUser = null;
      alert('Logging out...');
      window.location.href = 'signin.html';
    }

//INITIALIZE LOAD DATA
    document.addEventListener('DOMContentLoaded', () => {
      initLocalStorage();
      loadStudents();
      loadAnnouncements();
    });