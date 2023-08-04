import { html, render } from './node_modules/lit-html/lit-html.js'
async function solve() {
   document.querySelector('#searchBtn').addEventListener('click', onClick);

   let response = await fetch(`http://localhost:3030/jsonstore/advanced/table`);
   let tbody = document.querySelector('tbody');
   let htmlArr = [];
   let data = await response.json();
   let template = (el) => htmlArr.push(html` 
   <tr>              
   <td .textContent=${el.firstName + ' ' + el.firstName}></td>
   <td .textContent=${el.email}></td>
   <td .textContent=${el.course}></td>
   </tr>
   `)
   Object.values(data).forEach((el) => template(el));

   render(htmlArr, tbody);
   function onClick(e) {
      e.preventDefault();
      let searchField = document.querySelector('#searchField');
      let trs = document.querySelectorAll('tbody tr');
      Array.from(trs).forEach((tr) => {
         let tds = Array.from(tr.children);
         let notMatching = 0;
         tds.forEach((td) => {
            if (!td.textContent.includes(searchField.value)) {
               notMatching++;
            }
         })
         if (notMatching === 3) {
            tr.removeAttribute('class');
         }
         else {
            tr.setAttribute('class', 'select')
         }
      });
      searchField.value = '';
   }
}
solve();