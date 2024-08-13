import React from 'react';
import Layout from './layout';
import Cybergames from './components/cybergames'

class Resources extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Layout {...this.props} currentPage="resources">
        <div className="row" style={{ margin: "50px" }}>
          <div className="row">
            <div className="col-sm-4">
              <h2>Resources</h2>
              <div className="profileImg">
                <img src={"/assets/resources.jpg"} style={{ "width": "100%" }} alt="Resources" />
              </div>
              <br />
              <h5>Useful Links</h5>
              <ul className="list-group">
                <li className="list-group-item"><a href="/resources#cybergames">Cybersecurity Games</a></li>
                <li className="list-group-item"><a href="/resources#cyberSecurityResurces">Cyber Security</a></li>
                <li className="list-group-item"><a href="/resources#funding">Funding Opportunities</a></li>
                <li className="list-group-item"><a href="/resources#icpc">ICPC Resources</a></li>
              </ul>
              <br />
              <hr className="d-sm-none" />
            </div>
            <div className="col-sm-8">
              <Cybergames />
              <h2><a name="cyberSecurityResources">Cybersecurity Resources</a></h2>
              <ul>
                <li><a href="https://www.cssia.org/interactives/" rel="noreferrer" target="_blank">Cybersecurity Interactives</a></li>
                <li><a href="http://docs.kali.org/pdf/kali-book-en.pdf" target="_blank" rel="noreferrer"> Kali Linux Book</a></li>
                <li><a href="http://sectools.org" target="_blank" rel="noreferrer">Top 125 Security Tools </a></li>
                <li><a href="https://zmap.io" target="_blank" rel="noreferrer">Zmap - The Internet Scanner </a></li>
                <li><a href="https://www.owasp.org/index.php/OWASP_Hackademic_Challenges_Project" target="_blank" rel="noreferrer">Hackademic</a></li>
                <li><a href="https://www.hacking-lab.com/" target="_blank" rel="noreferrer">Hacking Lab</a></li>
                <li><a href="https://www.owasp.org/index.php/Category:OWASP_WebGoat_Project" target="_blank" rel="noreferrer">OWASP WebGoat Project</a></li>
                <li><a href="https://github.com/dloss/python-pentest-tools" target="_blank" rel="noreferrer">Python Libraries for Penetration Testers</a></li>
                <li><a href="https://docs.google.com/document/d/12Rdsj2PkVXErq_-qLUSJAsGeF9D-U2bI8XXWswPGkn8/edit" target="_blank" rel="noreferrer">Sniffing Traffic with SSL Strip and Wireshark</a></li>
                <li><a href="http://www.cs.virginia.edu/~evans/cs216/guides/x86.html" target="_blank" rel="noreferrer">x86 Assembly Guide</a></li>
                <li><a href="http://www.thegeekstuff.com/2011/01/iptables-fundamentals/" target="_blank" rel="noreferrer">IPTables, Chains, Rules Fundamentals</a></li>
                <li><a href="https://cs.nyu.edu/courses/fall02/V22.0201-001/nasm_doc_html/nasmdocb.html" target="_blank" rel="noreferrer">The Netwide Assembler: NASM</a></li>
                <li><a href="https://msdn.microsoft.com/en-us/library/windows/hardware/ff553442(v=vs.85).aspx" target="_blank" rel="noreferrer">Processor Architecture - x86 and x64 from MSDN</a></li>
                <li><a href="http://www.andrewsorensen.net/resources/c-assembly-gdb-reverse-engineering" target="_blank" rel="noreferrer">Reverse Engineering Resources</a></li>
                <li><a href="http://docs.cs.up.ac.za/programming/asm/derick_tut/" target="_blank" rel="noreferrer">Linux Assembly Tutorial</a></li>
                <li><a href="http://www.unknownroad.com/rtfm/gdbtut/gdbtoc.html" target="_blank" rel="noreferrer">GDB Debugger Tutorial</a></li>
                <li><a href="http://repo.hackerzvoice.net/depot_madchat/windoz/vulns/win32-shellcode.pdf" target="_blank" rel="noreferrer">Understanding Windows Shellcode</a></li>
                <li><a href="http://insecure.org/stf/smashstack.html" target="_blank" rel="noreferrer">Smash the Stack</a></li>
              </ul>
              <br />
              <br />
              <h2><a name="funding">Scholarships and Funding Opportunities </a></h2>
              <ul>
                <li><a href="http://www.nsf.gov/funding/pgm_list.jsp?org=DUE" target="_blank" rel="noreferrer">NSF Undergraduate Education (DUE) Active Funding Opportunities</a>
                </li>
                <li><a href="http://www.nsf.gov/funding/pgm_list.jsp?org=DUE" target="_blank" rel="noreferrer">Cybersecurity Scholarship - CyberCorps: Scholarship for Service (SFS)</a>
                </li>
                <li><a href="http://www.nsf.gov/funding/pgm_summ.jsp?pims_id=5517" target="_blank" rel="noreferrer">NSF - Research Experiences for Undergraduates (REU) </a>
                </li>
              </ul>
              <br />
              <h2><a name="icpc">ICPC Resources / Programming Concepts</a></h2>
              <ul>
                <li><a href="https://open.kattis.com/" target="_blank" rel="noreferrer">Kattis online judge</a></li>
                <li><a href="https://icpcarchive.ecs.baylor.edu/" target="_blank" rel="noreferrer">ACM - Live icpc archive</a></li>
                <li><a href="http://www.geeksforgeeks.org/" target="_blank" rel="noreferrer">GeeksforGeeks - Computer Science portal</a></li>
                <li><a href="http://www.spoj.com/" target="_blank" rel="noreferrer">Sphere online judge</a></li>
                <li><a href="http://codeforces.com/" target="_blank" rel="noreferrer">Code forces</a></li>
                <li><a href="http://topcoder.com/" target="_blank" rel="noreferrer">Topcoder</a></li>
              </ul>
              <br />
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}

export default Resources;