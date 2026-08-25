// SIDEBAR FUNCTION
      function showSection(sectionId) {
        document.querySelectorAll('.section').forEach(section => {
          section.classList.remove('active');
        });
        document.getElementById(sectionId).classList.add('active');
        if (sectionId === 'announcements') loadAnnouncements();
        if (sectionId === 'results') loadResults();
      }

//INTIALIZE LOCAL STORAGE
        function initLocalStorage() {
          if (!localStorage.getItem('announcements')) localStorage.setItem('announcements', JSON.stringify([]));
          if (!localStorage.getItem('examRequests')) localStorage.setItem('examRequests', JSON.stringify([]));
          if (!localStorage.getItem('medicalRequests')) localStorage.setItem('medicalRequests', JSON.stringify([]));
          if (!localStorage.getItem('results')) localStorage.setItem('results', JSON.stringify([]));
        }

//SHOW ANNOUNCMENTS 
        function loadAnnouncements() {
          const announcements = JSON.parse(localStorage.getItem('announcements') || '[]');
          const list = document.getElementById('announcement-list');
          list.innerHTML = '';
          announcements.forEach(announcement => {
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
            `;
            list.appendChild(div);
          });
        }

//SHOW SUBJECTS BASED ON COUSRE
      function showSubjects() {
        const course = document.getElementById('course').value;
        const year = document.getElementById('year').value;
        const semester = document.getElementById('semester').value;
        const registrationNumber = document.getElementById('registrationNumber').value || 'REG123';
        const tableContainer = document.getElementById('subjectTableContainer');
        const tableBody = document.getElementById('subjectTableBody');

        tableBody.innerHTML = '';
        if (course && year && semester && courseSubjects[course] && courseSubjects[course][year] && courseSubjects[course][year][semester]) {
          tableContainer.style.display = 'block';
          const subjects = courseSubjects[course][year][semester];
          const maxAttempts = 4;
          const attempts = (studentAttempts[registrationNumber] &&
                          studentAttempts[registrationNumber][course] &&
                          studentAttempts[registrationNumber][course][year] &&
                          studentAttempts[registrationNumber][course][year][semester]) || {};
          const medicals = JSON.parse(localStorage.getItem('medicalRequests') || '[]').filter(
            req => req.registrationNumber === registrationNumber && req.course === course
          );
          const absences = (studentAbsences[registrationNumber] &&
                          studentAbsences[registrationNumber][course] &&
                          studentAbsences[registrationNumber][course][year] &&
                          studentAbsences[registrationNumber][course][year][semester]) || {};

          subjects.forEach(subject => {
            const usedAttempts = attempts[subject.name] || 0;
            const medicalExemptions = medicals.filter(req => req.subject === subject.name).length;
            const absenceCount = absences[subject.name] || 0;
            const totalExemptions = medicalExemptions + absenceCount;
            const adjustedAttempts = usedAttempts - totalExemptions;
            const remainingAttempts = maxAttempts - adjustedAttempts;
            const row = document.createElement('tr');
            row.innerHTML = `
              <td>${subject.code}</td>
              <td><input type="checkbox" id="${subject.code}" name="${subject.name}"> ${subject.name}</td>
              <td>${remainingAttempts >= 0 ? remainingAttempts : 0}</td>
            `;
            tableBody.appendChild(row);
          });
        } else {
          tableContainer.style.display = 'none';
        }
      }

//COURSE CODE SUBJECT
      const courseSubjects = {
        HNDIT: {
          '1st': {
            '1st': [
              { name: 'Visual Application Programming', code: 'HNDIT1012' },
              { name: 'Web Design', code: 'HNDIT1022' },
              { name: 'Computer and Network Systems', code: 'HNDIT1032' },
              { name: 'Information Managment and Information Sysytems', code: 'HNDIT1042' },
              { name: 'ICT Project(Individual)', code: 'HNDIT1052' },
              { name: 'Communication Skill', code: 'HNDIT1062' }
            ],
            '2nd': [
              { name: 'Fundamentals of Programming', code: 'HNDIT2012' },
              { name: 'Software Development', code: 'HNDIT2022' },
              { name: 'System Analysis and Design', code: 'HNDIT2032' },
              { name: 'Data Communication and Computer Networks ', code: 'HNDIT2042' },
              { name: 'Principals of User Interface Design', code: 'HNDIT2052' },
              { name: 'ICT Project (Group)', code: 'HNDIT2062' },
              { name: 'Tecnical Writing', code: 'HNDIT2072' },
              { name: 'Human Value & Professional Ethics', code: 'HNDIT2082' }
            ]
          },
          '2nd': {
            '1st': [
              { name: 'Object Oriented Programming', code: 'HNDIT3012' },
              { name: 'Web Progrmming', code: 'HNDIT3022' },
              { name: 'Data Structures and Algorithms', code: 'HNDIT3032' },
              { name: 'Database Managment Systems', code: 'HNDIT3042' },
              { name: 'Operating Systems', code: 'HNDIT3052' },
              { name: 'Information and Computer Security', code: 'HNDIT3062' },
              { name: 'Statics for IT', code: 'HNDIT3072' }
            ],
            '2nd': [
              { name: 'Software Engineering', code: 'HNDIT4012' },
              { name: 'Software Quality Assurance ', code: 'HNDIT4022' },
              { name: 'IT Project Managment', code: 'HNDIT4032' },
              { name: 'Professional World', code: 'HNDIT4042' },
              { name: 'Programming Individual Project', code: 'HNDIT4052' },
              { name: ' Machine Learning', code: 'HNDIT4012' },
              { name: 'Business Analysis Practice', code: 'HNDIT4022' },
              { name: 'Enterprise Architecture', code: 'HNDIT4032' },
              { name: 'Computer Service Managment', code: 'HNDIT4042' }
            ]
          }
        },
        HNDE: {
          '1st': {
            '1st': [
              { name: 'Reading & Vocabulary Development', code: 'HNDE1111' },
              { name: 'Effective Communication Skills I', code: 'HNDE1112' },
              { name: 'Listening Skills I', code: 'HNDE1113' },
              { name: 'Language Structure, Usage & Linguistics I', code: 'HNDE1114' },
              { name: 'Introduction to Literature', code: 'HNDE1115' },
              { name: 'Professional Writing I', code: 'HNDE1116' },
              { name: 'Computer Assisted Language Learning & Study Skills I', code: 'HNDE1117' }
            ],
            '2nd': [
              {name: 'Intermediate Reading & Vocabulary Development', code: 'HNDE2111' },
              {name: 'Effective Communication Skills II', code: 'HNDE1212' },
              {name: 'Listening Skills II', code: 'HNDE1213' },
              {name: 'Language Structure, Usage & Linguistics II', code: 'HNDE1214' },
              {name: '	British & American literature', code: 'HNDE1215' },
              {name: 'Professional Writing II', code: 'HND1216' },
              {name: 'Computer Assited Language Learning & Study Skills II ', code: 'HNDE1217' }
            ]
          },
          '2nd': {
            '1st': [
              { name: 'Advanced Reading & Vocabulary Development I', code: 'HNDE2111' },
              { name: 'Technology based Communication Skills', code: 'HNDE2112' },
              { name: 'Language Structure, Usage & Linguistics III', code: 'HNDE2113' },
              { name: 'Commonwealth Literature', code: 'HNDE2114' },
              { name: 'Professional Writing III', code: 'HNDE2115' },
              { name: 'Research Methodology', code: 'HNDE2116' },
              { name: 'English Language Teaching Methodology I', code: 'HNDE2117' },
              { name: 'Fundamental Business English I /Fundamental', code: 'HNDE2118' },
              { name: 'Journalism I', code: 'HNDE2119' }
            
            ],
            '2nd': [
              { name: 'Advanced Reading & Vocabulary Development II', code: 'HNDE2211' },
              { name: 'Language Structure, Usage & Linguistics IV', code: 'HNDE2212' },
              { name: 'Sri Lankan Literature', code: 'HNDE2213' },
              { name: 'Advanced Professional Writing.', code: 'HNDE2214' },
              { name: 'English Language Teaching Methodology II', code: 'HNDE2215' },
              { name: 'Fundamental Business English II / Fundamental', code: 'HNDE2216' },
              { name: 'Journalism II', code: 'HNDE2217' },
              { name: 'Principles of education ', code: 'HNDE2218' },
              { name: 'Intermediate Business English', code: 'HNDE2219' },
              { name: 'Intermediate Journalism', code: 'HNDE2220' },
              { name: 'Educational Measurement ', code: 'HNDE2221' },
              { name: 'Advanced Business English I', code: 'HNDE2222' },
              { name: 'Advanced Journalism I ', code: 'HNDE2223' },
              { name: 'Educational Psychology', code: 'HNDE2221' },
              { name: 'Advanced Business English II ', code: 'HNDE2222' },
              { name: 'Advanced Journalism II', code: 'HNDE2223' }

              
            ]
          }
        },
        HNDTHM: {
          '1st': {
            '1st': [
              { name: 'Tourism Management', code: 'HNDTHM-Y1S1-TM' },
            ],
            '2nd': [
              { name: 'Event Planning', code: 'HNDTHM-Y1S2-EP' },
              { name: 'Tourism Marketing', code: 'HNDTHM-Y1S2-TM' },
              { name: 'Travel Agency Operations', code: 'HNDTHM-Y1S2-TAO' }
            ]
          },
          '2nd': {
            '1st': [
              { name: 'Marketing in Tourism', code: 'HNDTHM-Y2S1-MT' },
              { name: 'Financial Management', code: 'HNDTHM-Y2S1-FM' },
              { name: 'Sustainable Tourism', code: 'HNDTHM-Y2S1-ST' }
            ],
            '2nd': [
              { name: 'Hotel Operations', code: 'HNDTHM-Y2S2-HO' },
              { name: 'Tourism Policy', code: 'HNDTHM-Y2S2-TP' },
              { name: 'Destination Management', code: 'HNDTHM-Y2S2-DM' }
            ]
          }
        },
        HNDM: {
          '1st': {
            '1st': [
              { name: 'Management Principles', code: 'HNDM-Y1S1-MP' },
              { name: 'Accounting Basics', code: 'HNDM-Y1S1-AB' },
              { name: 'Business Law', code: 'HNDM-Y1S1-BL' }
            ],
            '2nd': [
              { name: 'Marketing Fundamentals', code: 'HNDM-Y1S2-MF' },
              { name: 'Organizational Behavior', code: 'HNDM-Y1S2-OB' },
              { name: 'Economics', code: 'HNDM-Y1S2-EC' }
            ]
          },
          '2nd': {
            '1st': [
              { name: 'Strategic Management', code: 'HNDM-Y2S1-SM' },
              { name: 'Financial Analysis', code: 'HNDM-Y2S1-FA' },
              { name: 'Human Resource Management', code: 'HNDM-Y2S1-HRM' }
            ],
            '2nd': [
              { name: 'Entrepreneurship', code: 'HNDM-Y2S2-EN' },
              { name: 'Operations Management', code: 'HNDM-Y2S2-OM' },
              { name: 'Business Ethics', code: 'HNDM-Y2S2-BE' }
            ]
          }
        }
      };

      const studentAttempts = {
        'REG123': {
          'HNDIT': {
            '1st': {
              '1st': {
                'Programming Fundamentals': 1,
                'Database Systems': 2,
                'Basic Networking': 0
              },
              '2nd': {
                'Web Development': 3,
                'Computer Architecture': 1,
                'Mathematics for IT': 0
              }
            },
            '2nd': {
              '1st': {
                'Software Engineering': 1,
                'Data Structures': 0,
                'Operating Systems': 2
              },
              '2nd': {
                'Mobile App Development': 0,
                'Cloud Computing': 1,
                'IT Project Management': 0
              }
            }
          },
          'HNDE': {
            '1st': {
              '1st': { 'English Literature': 0, 'Communication Skills': 1, 'Basic Linguistics': 2 },
              '2nd': { 'Creative Writing': 0, 'English Grammar': 1, 'Literary Analysis': 0 }
            },
            '2nd': {
              '1st': { 'Advanced Grammar': 1, 'Translation Studies': 0, 'Phonetics': 0 },
              '2nd': { 'Professional Writing': 0, 'Language Teaching': 0, 'Cultural Studies': 0 }
            }
          }
        }
      };

      const studentAbsences = {
        'REG123': {
          'HNDIT': {
            '1st': {
              '1st': {
                'Programming Fundamentals': 1,
                'Database Systems': 0,
                'Basic Networking': 0
              },
              '2nd': {
                'Web Development': 0,
                'Computer Architecture': 0,
                'Mathematics for IT': 0
              }
            }
          }
        }
      };

//EXAM FORM
      document.getElementById('examRegistrationForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const formData = {
          studentName: document.getElementById('studentName').value,
          address: document.getElementById('address').value,
          gender: document.getElementById('gender').value,
          telephone: document.getElementById('telephone').value,
          registrationNumber: document.getElementById('registrationNumber').value || 'REG123',
          course: document.getElementById('course').value,
          year: document.getElementById('year').value,
          semester: document.getElementById('semester').value,
          subjects: []
        };

        const course = formData.course;
        const year = formData.year;
        const semester = formData.semester;
        if (course && year && semester && courseSubjects[course] && courseSubjects[course][year] && courseSubjects[course][year][semester]) {
          const subjects = courseSubjects[course][year][semester];
          const attempts = (studentAttempts[formData.registrationNumber] &&
                          studentAttempts[formData.registrationNumber][course] &&
                          studentAttempts[formData.registrationNumber][course][year] &&
                          studentAttempts[formData.registrationNumber][course][year][semester]) || {};
          const medicals = JSON.parse(localStorage.getItem('medicalRequests') || '[]').filter(
            req => req.registrationNumber === formData.registrationNumber && req.course === course
          );
          const absences = (studentAbsences[formData.registrationNumber] &&
                          studentAbsences[formData.registrationNumber][course] &&
                          studentAbsences[formData.registrationNumber][course][year] &&
                          studentAbsences[formData.registrationNumber][course][year][semester]) || {};
          subjects.forEach(subject => {
            const usedAttempts = attempts[subject.name] || 0;
            const medicalExemptions = medicals.filter(req => req.subject === subject.name).length;
            const absenceCount = absences[subject.name] || 0;
            const totalExemptions = medicalExemptions + absenceCount;
            const adjustedAttempts = usedAttempts - totalExemptions;
            const remainingAttempts = 4 - adjustedAttempts;
            formData.subjects.push({
              subject: subject.name,
              code: subject.code,
              remainingAttempts: remainingAttempts >= 0 ? remainingAttempts : 0
            });
          });
        }

        let examRequests = JSON.parse(localStorage.getItem('examRequests') || '[]');
        examRequests.push(formData);
        localStorage.setItem('examRequests', JSON.stringify(examRequests));
        alert('Exam registration submitted successfully!');
        document.getElementById('examRegistrationForm').reset();
        showSubjects();
      });

//MEDICAL FORM
      document.getElementById('medicalForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const formData = {
          studentName: document.getElementById('medicalStudentName').value,
          course: document.getElementById('medicalCourse').value,
          registrationNumber: document.getElementById('indexNumber').value,
          medicalPeriod: document.getElementById('medicalPeriod').value,
          examDate: document.getElementById('examDate').value,
          subject: document.getElementById('medicalSubject').value,
          attempt: document.getElementById('attempt').value,
          doctorName: document.getElementById('doctorName').value,
          medicalType: document.getElementById('medicalType').value,
          issueDate: document.getElementById('issueDate').value
        };

        let medicalRequests = JSON.parse(localStorage.getItem('medicalRequests') || '[]');
        medicalRequests.push(formData);
        localStorage.setItem('medicalRequests', JSON.stringify(medicalRequests));
        alert('Medical request submitted successfully!');
        document.getElementById('medicalForm').reset();
      });

//RESULTS 
        document.addEventListener('DOMContentLoaded', function() {
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
      alert('Logging out...');
      window.location.href = 'signin.html';
    }

//INITILIZE AND LOAD DATA
    document.addEventListener('DOMContentLoaded', () => {
      initLocalStorage();
      loadAnnouncements();
      document.getElementById('course').addEventListener('change', showSubjects);
      document.getElementById('year').addEventListener('change', showSubjects);
      document.getElementById('semester').addEventListener('change', showSubjects);
    });