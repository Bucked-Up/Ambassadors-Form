const form = document.querySelector("#ambassador-form");
const allInputs = form.querySelectorAll("input");

const createInvalid = (text) => {
  return `<p class="error-text">${text}</p>`;
};

const checkInput = (input) => {
  const regex = input.getAttribute("regex");
  const reg = new RegExp(`${regex}`);
  const match = document.getElementById(input.getAttribute("match"));
  const matcher = document.querySelector(`[match="${input.id}"]`);

  const valueIsNotValid = () => {
    return (
      (regex && !reg.test(input.value)) || (match && input.value !== match.value) || (matcher && input.value !== matcher.value && matcher.value.length !== 0)
    );
  };

  if (input.type === "checkbox" && !input.checked) return false;
  if ((!input.hasAttribute("optional") && input.value.trim().length === 0) || valueIsNotValid()) {
    input.classList.add("error");
    if (valueIsNotValid() && input.value.trim().length > 0 && !input.nextElementSibling?.classList.contains("error-text")) {
      input.insertAdjacentHTML("afterend", createInvalid("Invalid!"));
    }
    return false;
  }
  input.classList.remove("error");
  matcher?.classList.remove("error");
  match?.classList.remove("error");
  if (input.nextElementSibling?.classList.contains("error-text")) input.nextElementSibling.remove();
  if (matcher?.nextElementSibling?.classList.contains("error-text")) matcher?.nextElementSibling.remove();
  if (match?.nextElementSibling?.classList.contains("error-text")) match?.nextElementSibling.remove();
  return true;
};

const addListener = (input) => {
  const listeners = ["focusout"];
  if (input.type === "checkbox") listeners.push("input");
  listeners.forEach((ev) => {
    input.addEventListener(ev, () => {
      checkInput(input);
    });
  });
};

allInputs.forEach((input) => {
  addListener(input);
});

const countrySelect = document.querySelector("#country");
const stateSelect = document.querySelector("#state");

const updateStates = async () => {
  const statesObj = {
    US: '<option value="">Please Select</option><option value="AL">Alabama</option><option value="AK">Alaska</option><option value="AS">American Samoa</option><option value="AZ">Arizona</option><option value="AR">Arkansas</option><option value="UM-81">Baker Island</option><option value="CA">California</option><option value="CO">Colorado</option><option value="CT">Connecticut</option><option value="DE">Delaware</option><option value="DC">District of Columbia</option><option value="FL">Florida</option><option value="GA">Georgia</option><option value="GU">Guam</option><option value="HI">Hawaii</option><option value="UM-84">Howland Island</option><option value="ID">Idaho</option><option value="IL">Illinois</option><option value="IN">Indiana</option><option value="IA">Iowa</option><option value="UM-86">Jarvis Island</option><option value="UM-67">Johnston Atoll</option><option value="KS">Kansas</option><option value="KY">Kentucky</option><option value="UM-89">Kingman Reef</option><option value="LA">Louisiana</option><option value="ME">Maine</option><option value="MD">Maryland</option><option value="MA">Massachusetts</option><option value="MI">Michigan</option><option value="UM-71">Midway Atoll</option><option value="MN">Minnesota</option><option value="MS">Mississippi</option><option value="MO">Missouri</option><option value="MT">Montana</option><option value="UM-76">Navassa Island</option><option value="NE">Nebraska</option><option value="NV">Nevada</option><option value="NH">New Hampshire</option><option value="NJ">New Jersey</option><option value="NM">New Mexico</option><option value="NY">New York</option><option value="NC">North Carolina</option><option value="ND">North Dakota</option><option value="MP">Northern Mariana Islands</option><option value="OH">Ohio</option><option value="OK">Oklahoma</option><option value="OR">Oregon</option><option value="UM-95">Palmyra Atoll</option><option value="PA">Pennsylvania</option><option value="PR">Puerto Rico</option><option value="RI">Rhode Island</option><option value="SC">South Carolina</option><option value="SD">South Dakota</option><option value="TN">Tennessee</option><option value="TX">Texas</option><option value="UM">United States Minor Outlying Islands</option><option value="VI">United States Virgin Islands</option><option value="UT">Utah</option><option value="VT">Vermont</option><option value="VA">Virginia</option><option value="UM-79">Wake Island</option><option value="WA">Washington</option><option value="WV">West Virginia</option><option value="WI">Wisconsin</option><option value="WY">Wyoming</option>',
    AU: '<option value="">Please Select</option><option value="ACT">Australian Capital Territory</option><option value="NSW">New South Wales</option><option value="NT">Northern Territory</option><option value="QLD">Queensland</option><option value="SA">South Australia</option><option value="TAS">Tasmania</option><option value="VIC">Victoria</option><option value="WA">Western Australia</option>',
    CA: '<option value="">Please Select</option><option value="AB">Alberta</option><option value="BC">British Columbia</option><option value="MB">Manitoba</option><option value="NB">New Brunswick</option><option value="NL">Newfoundland and Labrador</option><option value="NT">Northwest Territories</option><option value="NS">Nova Scotia</option><option value="NU">Nunavut</option><option value="ON">Ontario</option><option value="PE">Prince Edward Island</option><option value="QC">Quebec</option><option value="SK">Saskatchewan</option><option value="YT">Yukon</option>',
    MX: '<option value="">Please Select</option><option value="AGU">Aguascalientes</option><option value="BCN">Baja California</option><option value="BCS">Baja California Sur</option><option value="CAM">Campeche</option><option value="CHP">Chiapas</option><option value="CHH">Chihuahua</option><option value="COA">Coahuila</option><option value="COL">Colima</option><option value="DUR">Durango</option><option value="GUA">Guanajuato</option><option value="GRO">Guerrero</option><option value="HID">Hidalgo</option><option value="JAL">Jalisco</option><option value="MEX">México</option><option value="CMX">Mexico City</option><option value="MIC">Michoacán</option><option value="MOR">Morelos</option><option value="NAY">Nayarit</option><option value="NLE">Nuevo León</option><option value="OAX">Oaxaca</option><option value="PUE">Puebla</option><option value="QUE">Querétaro</option><option value="ROO">Quintana Roo</option><option value="SLP">San Luis Potosí</option><option value="SIN">Sinaloa</option><option value="SON">Sonora</option><option value="TAB">Tabasco</option><option value="TAM">Tamaulipas</option><option value="TLA">Tlaxcala</option><option value="VER">Veracruz</option><option value="YUC">Yucatán</option><option value="ZAC">Zacatecas</option>',
    GB: '<option value="">Please Select</option><option value="ABE">Aberdeen</option><option value="ABD">Aberdeenshire</option><option value="ANS">Angus</option><option value="ANT">Antrim</option><option value="ANN">Antrim and Newtownabbey</option><option value="ARD">Ards</option><option value="AND">Ards and North Down</option><option value="AGB">Argyll and Bute</option><option value="ARM">Armagh City and District Council</option><option value="ABC">Armagh, Banbridge and Craigavon</option><option value="SH-AC">Ascension Island</option><option value="BLA">Ballymena Borough</option><option value="BLY">Ballymoney</option><option value="BNB">Banbridge</option><option value="BNS">Barnsley</option><option value="BAS">Bath and North East Somerset</option><option value="BDF">Bedford</option><option value="BFS">Belfast district</option><option value="BIR">Birmingham</option><option value="BBD">Blackburn with Darwen</option><option value="BPL">Blackpool</option><option value="BGW">Blaenau Gwent County Borough</option><option value="BOL">Bolton</option><option value="BMH">Bournemouth</option><option value="BRC">Bracknell Forest</option><option value="BRD">Bradford</option><option value="BGE">Bridgend County Borough</option><option value="BNH">Brighton and Hove</option><option value="BKM">Buckinghamshire</option><option value="BUR">Bury</option><option value="CAY">Caerphilly County Borough</option><option value="CLD">Calderdale</option><option value="CAM">Cambridgeshire</option><option value="CMN">Carmarthenshire</option><option value="CKF">Carrickfergus Borough Council</option><option value="CSR">Castlereagh</option><option value="CCG">Causeway Coast and Glens</option><option value="CBF">Central Bedfordshire</option><option value="CGN">Ceredigion</option><option value="CHE">Cheshire East</option><option value="CHW">Cheshire West and Chester</option><option value="CRF">City and County of Cardiff</option><option value="SWA">City and County of Swansea</option><option value="BST">City of Bristol</option><option value="DER">City of Derby</option><option value="KHL">City of Kingston upon Hull</option><option value="LCE">City of Leicester</option><option value="LND">City of London</option><option value="NGM">City of Nottingham</option><option value="PTE">City of Peterborough</option><option value="PLY">City of Plymouth</option><option value="POR">City of Portsmouth</option><option value="STH">City of Southampton</option><option value="STE">City of Stoke-on-Trent</option><option value="SND">City of Sunderland</option><option value="WSM">City of Westminster</option><option value="WLV">City of Wolverhampton</option><option value="YOR">City of York</option><option value="CLK">Clackmannanshire</option><option value="CLR">Coleraine Borough Council</option><option value="CWY">Conwy County Borough</option><option value="CKT">Cookstown District Council</option><option value="CON">Cornwall</option><option value="DUR">County Durham</option><option value="COV">Coventry</option><option value="CGV">Craigavon Borough Council</option><option value="CMA">Cumbria</option><option value="DAL">Darlington</option><option value="DEN">Denbighshire</option><option value="DBY">Derbyshire</option><option value="DRS">Derry City and Strabane</option><option value="DRY">Derry City Council</option><option value="DEV">Devon</option><option value="DNC">Doncaster</option><option value="DOR">Dorset</option><option value="DOW">Down District Council</option><option value="DUD">Dudley</option><option value="DGY">Dumfries and Galloway</option><option value="DND">Dundee</option><option value="DGN">Dungannon and South Tyrone Borough Council</option><option value="EAY">East Ayrshire</option><option value="EDU">East Dunbartonshire</option><option value="ELN">East Lothian</option><option value="ERW">East Renfrewshire</option><option value="ERY">East Riding of Yorkshire</option><option value="ESX">East Sussex</option><option value="EDH">Edinburgh</option><option value="ENG">England</option><option value="ESS">Essex</option><option value="FAL">Falkirk</option><option value="FMO">Fermanagh and Omagh</option><option value="FER">Fermanagh District Council</option><option value="FIF">Fife</option><option value="FLN">Flintshire</option><option value="GAT">Gateshead</option><option value="GLG">Glasgow</option><option value="GLS">Gloucestershire</option><option value="GWN">Gwynedd</option><option value="HAL">Halton</option><option value="HAM">Hampshire</option><option value="HPL">Hartlepool</option><option value="HEF">Herefordshire</option><option value="HRT">Hertfordshire</option><option value="HLD">Highland</option><option value="IVC">Inverclyde</option><option value="IOW">Isle of Wight</option><option value="IOS">Isles of Scilly</option><option value="KEN">Kent</option><option value="KIR">Kirklees</option><option value="KWL">Knowsley</option><option value="LAN">Lancashire</option><option value="LRN">Larne Borough Council</option><option value="LDS">Leeds</option><option value="LEC">Leicestershire</option><option value="LMV">Limavady Borough Council</option><option value="LIN">Lincolnshire</option><option value="LBC">Lisburn and Castlereagh</option><option value="LSB">Lisburn City Council</option><option value="LIV">Liverpool</option><option value="BDG">London Borough of Barking and Dagenham</option><option value="BNE">London Borough of Barnet</option><option value="BEX">London Borough of Bexley</option><option value="BEN">London Borough of Brent</option><option value="BRY">London Borough of Bromley</option><option value="CMD">London Borough of Camden</option><option value="CRY">London Borough of Croydon</option><option value="EAL">London Borough of Ealing</option><option value="ENF">London Borough of Enfield</option><option value="HCK">London Borough of Hackney</option><option value="HMF">London Borough of Hammersmith and Fulham</option><option value="HRY">London Borough of Haringey</option><option value="HRW">London Borough of Harrow</option><option value="HAV">London Borough of Havering</option><option value="HIL">London Borough of Hillingdon</option><option value="HNS">London Borough of Hounslow</option><option value="ISL">London Borough of Islington</option><option value="LBH">London Borough of Lambeth</option><option value="LEW">London Borough of Lewisham</option><option value="MRT">London Borough of Merton</option><option value="NWM">London Borough of Newham</option><option value="RDB">London Borough of Redbridge</option><option value="RIC">London Borough of Richmond upon Thames</option><option value="SWK">London Borough of Southwark</option><option value="STN">London Borough of Sutton</option><option value="TWH">London Borough of Tower Hamlets</option><option value="WFT">London Borough of Waltham Forest</option><option value="WND">London Borough of Wandsworth</option><option value="MFT">Magherafelt District Council</option><option value="MAN">Manchester</option><option value="MDW">Medway</option><option value="MTY">Merthyr Tydfil County Borough</option><option value="WGN">Metropolitan Borough of Wigan</option><option value="MEA">Mid and East Antrim</option><option value="MUL">Mid Ulster</option><option value="MDB">Middlesbrough</option><option value="MLN">Midlothian</option><option value="MIK">Milton Keynes</option><option value="MON">Monmouthshire</option><option value="MRY">Moray</option><option value="MYL">Moyle District Council</option><option value="NTL">Neath Port Talbot County Borough</option><option value="NET">Newcastle upon Tyne</option><option value="NWP">Newport</option><option value="NYM">Newry and Mourne District Council</option><option value="NMD">Newry, Mourne and Down</option><option value="NTA">Newtownabbey Borough Council</option><option value="NFK">Norfolk</option><option value="NAY">North Ayrshire</option><option value="NDN">North Down Borough Council</option><option value="NEL">North East Lincolnshire</option><option value="NLK">North Lanarkshire</option><option value="NLN">North Lincolnshire</option><option value="NSM">North Somerset</option><option value="NTY">North Tyneside</option><option value="NYK">North Yorkshire</option><option value="NTH">Northamptonshire</option><option value="NIR">Northern Ireland</option><option value="NBL">Northumberland</option><option value="NTT">Nottinghamshire</option><option value="OLD">Oldham</option><option value="OMH">Omagh District Council</option><option value="ORK">Orkney Islands</option><option value="ELS">Outer Hebrides</option><option value="OXF">Oxfordshire</option><option value="PEM">Pembrokeshire</option><option value="PKN">Perth and Kinross</option><option value="POL">Poole</option><option value="POW">Powys</option><option value="RDG">Reading</option><option value="RCC">Redcar and Cleveland</option><option value="RFW">Renfrewshire</option><option value="RCT">Rhondda Cynon Taf</option><option value="RCH">Rochdale</option><option value="ROT">Rotherham</option><option value="GRE">Royal Borough of Greenwich</option><option value="KEC">Royal Borough of Kensington and Chelsea</option><option value="KTT">Royal Borough of Kingston upon Thames</option><option value="RUT">Rutland</option><option value="SH-HL">Saint Helena</option><option value="SLF">Salford</option><option value="SAW">Sandwell</option><option value="SCT">Scotland</option><option value="SCB">Scottish Borders</option><option value="SFT">Sefton</option><option value="SHF">Sheffield</option><option value="ZET">Shetland Islands</option><option value="SHR">Shropshire</option><option value="SLG">Slough</option><option value="SOL">Solihull</option><option value="SOM">Somerset</option><option value="SAY">South Ayrshire</option><option value="SGC">South Gloucestershire</option><option value="SLK">South Lanarkshire</option><option value="STY">South Tyneside</option><option value="SOS">Southend-on-Sea</option><option value="SHN">St Helens</option><option value="STS">Staffordshire</option><option value="STG">Stirling</option><option value="SKP">Stockport</option><option value="STT">Stockton-on-Tees</option><option value="STB">Strabane District Council</option><option value="SFK">Suffolk</option><option value="SRY">Surrey</option><option value="SWD">Swindon</option><option value="TAM">Tameside</option><option value="TFW">Telford and Wrekin</option><option value="THR">Thurrock</option><option value="TOB">Torbay</option><option value="TOF">Torfaen</option><option value="TRF">Trafford</option><option value="UKM">United Kingdom</option><option value="VGL">Vale of Glamorgan</option><option value="WKF">Wakefield</option><option value="WLS">Wales</option><option value="WLL">Walsall</option><option value="WRT">Warrington</option><option value="WAR">Warwickshire</option><option value="WBK">West Berkshire</option><option value="WDU">West Dunbartonshire</option><option value="WLN">West Lothian</option><option value="WSX">West Sussex</option><option value="WIL">Wiltshire</option><option value="WNM">Windsor and Maidenhead</option><option value="WRL">Wirral</option><option value="WOK">Wokingham</option><option value="WOR">Worcestershire</option><option value="WRX">Wrexham County Borough</option>',
  };
  const country = countrySelect.value.split("-")[1];
  stateSelect.innerHTML = statesObj[country];
};

const getUrlParams = async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const firstName = urlParams.get("first-name");
  const lastName = urlParams.get("last-name");
  const mail = urlParams.get("email");
  const phone = urlParams.get("phone");
  const state = urlParams.get("state");
  const city = urlParams.get("city");
  if (firstName) {
    document.querySelector("#first-name").value = firstName;
    document.querySelector("#last-name").value = lastName;
    document.querySelector("#email").value = mail;
    document.querySelector("#email-confirm").value = mail;
    document.querySelector("#phone").value = phone;
    document.querySelector("#city").value = city;
  }
  await updateStates();
  if (state) document.querySelector("#state").value = state;
};

countrySelect.addEventListener("change", async () => {
  updateStates();
});

getUrlParams();

const addInsta = document.querySelector("#add-insta");
const addTikTok = document.querySelector("#add-tiktok");
const addFacebook = document.querySelector("#add-facebook");
const socials = document.querySelector(".socials");

const svgButton =
  '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="14.5962" y="4.59619" width="1" height="14" transform="rotate(45 14.5962 4.59619)" fill="white" /><rect x="15.3033" y="14.4957" width="1" height="14" transform="rotate(135 15.3033 14.4957)" fill="white" /></svg>';

const svgInsta =
  '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_5_788)"><path d="M12 2.16094C15.2063 2.16094 15.5859 2.175 16.8469 2.23125C18.0188 2.28281 18.6516 2.47969 19.0734 2.64375C19.6313 2.85938 20.0344 3.12188 20.4516 3.53906C20.8734 3.96094 21.1313 4.35938 21.3469 4.91719C21.5109 5.33906 21.7078 5.97656 21.7594 7.14375C21.8156 8.40937 21.8297 8.78906 21.8297 11.9906C21.8297 15.1969 21.8156 15.5766 21.7594 16.8375C21.7078 18.0094 21.5109 18.6422 21.3469 19.0641C21.1313 19.6219 20.8687 20.025 20.4516 20.4422C20.0297 20.8641 19.6313 21.1219 19.0734 21.3375C18.6516 21.5016 18.0141 21.6984 16.8469 21.75C15.5813 21.8062 15.2016 21.8203 12 21.8203C8.79375 21.8203 8.41406 21.8062 7.15313 21.75C5.98125 21.6984 5.34844 21.5016 4.92656 21.3375C4.36875 21.1219 3.96563 20.8594 3.54844 20.4422C3.12656 20.0203 2.86875 19.6219 2.65313 19.0641C2.48906 18.6422 2.29219 18.0047 2.24063 16.8375C2.18438 15.5719 2.17031 15.1922 2.17031 11.9906C2.17031 8.78438 2.18438 8.40469 2.24063 7.14375C2.29219 5.97187 2.48906 5.33906 2.65313 4.91719C2.86875 4.35938 3.13125 3.95625 3.54844 3.53906C3.97031 3.11719 4.36875 2.85938 4.92656 2.64375C5.34844 2.47969 5.98594 2.28281 7.15313 2.23125C8.41406 2.175 8.79375 2.16094 12 2.16094ZM12 0C8.74219 0 8.33438 0.0140625 7.05469 0.0703125C5.77969 0.126563 4.90313 0.332812 4.14375 0.628125C3.35156 0.9375 2.68125 1.34531 2.01563 2.01562C1.34531 2.68125 0.9375 3.35156 0.628125 4.13906C0.332812 4.90313 0.126563 5.775 0.0703125 7.05C0.0140625 8.33437 0 8.74219 0 12C0 15.2578 0.0140625 15.6656 0.0703125 16.9453C0.126563 18.2203 0.332812 19.0969 0.628125 19.8563C0.9375 20.6484 1.34531 21.3188 2.01563 21.9844C2.68125 22.65 3.35156 23.0625 4.13906 23.3672C4.90313 23.6625 5.775 23.8687 7.05 23.925C8.32969 23.9812 8.7375 23.9953 11.9953 23.9953C15.2531 23.9953 15.6609 23.9812 16.9406 23.925C18.2156 23.8687 19.0922 23.6625 19.8516 23.3672C20.6391 23.0625 21.3094 22.65 21.975 21.9844C22.6406 21.3188 23.0531 20.6484 23.3578 19.8609C23.6531 19.0969 23.8594 18.225 23.9156 16.95C23.9719 15.6703 23.9859 15.2625 23.9859 12.0047C23.9859 8.74688 23.9719 8.33906 23.9156 7.05938C23.8594 5.78438 23.6531 4.90781 23.3578 4.14844C23.0625 3.35156 22.6547 2.68125 21.9844 2.01562C21.3188 1.35 20.6484 0.9375 19.8609 0.632812C19.0969 0.3375 18.225 0.13125 16.95 0.075C15.6656 0.0140625 15.2578 0 12 0Z"fill="#000100" /><path d="M12 5.83594C8.59688 5.83594 5.83594 8.59688 5.83594 12C5.83594 15.4031 8.59688 18.1641 12 18.1641C15.4031 18.1641 18.1641 15.4031 18.1641 12C18.1641 8.59688 15.4031 5.83594 12 5.83594ZM12 15.9984C9.79219 15.9984 8.00156 14.2078 8.00156 12C8.00156 9.79219 9.79219 8.00156 12 8.00156C14.2078 8.00156 15.9984 9.79219 15.9984 12C15.9984 14.2078 14.2078 15.9984 12 15.9984Z"fill="#000100" /><path d="M19.8469 5.5922C19.8469 6.38908 19.2 7.03127 18.4078 7.03127C17.6109 7.03127 16.9688 6.38439 16.9688 5.5922C16.9688 4.79533 17.6156 4.15314 18.4078 4.15314C19.2 4.15314 19.8469 4.80001 19.8469 5.5922Z"fill="#000100" /></g><defs><clipPath id="clip0_5_788"><rect width="24" height="24" fill="white" /></clipPath></defs></svg>';

const svgTikTok =
  '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M17.1765 8.66345C18.7199 9.77065 20.6105 10.4221 22.6525 10.4221V6.4786C22.2661 6.4787 21.8807 6.43825 21.5026 6.35785V9.46195C19.4607 9.46195 17.5703 8.8105 16.0265 7.7034V15.7509C16.0265 19.7767 12.7746 23.0399 8.7634 23.0399C7.2667 23.0399 5.8756 22.5858 4.72003 21.8071C6.03895 23.1604 7.87825 24 9.91315 24C13.9246 24 17.1767 20.7367 17.1767 16.7108L17.1765 8.66345ZM18.5952 4.685C17.8064 3.82023 17.2886 2.70268 17.1765 1.46718V0.959961H16.0868C16.3611 2.53028 17.2967 3.87187 18.5952 4.685ZM7.2571 18.7178C6.81645 18.138 6.5783 17.4286 6.57935 16.6993C6.57935 14.858 8.0668 13.3651 9.90185 13.3651C10.2438 13.3651 10.5838 13.4176 10.9097 13.5214V9.48975C10.5288 9.4374 10.1444 9.41515 9.76015 9.4233V12.5613C9.434 12.4575 9.0939 12.4048 8.75185 12.4052C6.91675 12.4052 5.42945 13.8979 5.42945 15.7394C5.42945 17.0414 6.1729 18.1687 7.2571 18.7178Z" fill="#FF004F"/><path d="M16.0264 7.7033C17.5702 8.8104 19.4606 9.46185 21.5025 9.46185V6.3578C20.3627 6.11415 19.3537 5.5164 18.5951 4.685C17.2965 3.87179 16.361 2.5302 16.0866 0.959961H13.2241V16.7106C13.2176 18.5468 11.7327 20.0336 9.9016 20.0336C8.82255 20.0336 7.86395 19.5174 7.2568 18.7178C6.1727 18.1687 5.42925 17.0413 5.42925 15.7394C5.42925 13.8981 6.91655 12.4052 8.7516 12.4052C9.1032 12.4052 9.4421 12.4602 9.75995 12.5614V9.4234C5.8192 9.5051 2.6499 12.7365 2.6499 16.7107C2.6499 18.6946 3.43914 20.4931 4.72007 21.8072C5.87565 22.5858 7.26675 23.04 8.7634 23.04C12.7747 23.04 16.0265 19.7766 16.0265 15.7509L16.0264 7.7033Z" fill="black"/><path d="M21.5026 6.3578V5.5185C20.4748 5.52005 19.4671 5.2312 18.5951 4.68494C19.3671 5.53305 20.3836 6.11785 21.5026 6.3578ZM16.0867 0.959985C16.0606 0.80991 16.0405 0.65885 16.0265 0.507215V0H12.074V15.7508C12.0677 17.5868 10.5829 19.0735 8.75165 19.0735C8.214 19.0735 7.7064 18.9455 7.25685 18.7179C7.86395 19.5174 8.8226 20.0336 9.90165 20.0336C11.7326 20.0336 13.2177 18.5469 13.2241 16.7107V0.959985H16.0867ZM9.76015 9.4234V8.5299C9.4299 8.4846 9.0969 8.46185 8.76355 8.462C4.75191 8.46195 1.5 11.7254 1.5 15.7508C1.5 18.2746 2.77806 20.4987 4.72017 21.807C3.43924 20.493 2.65001 18.6944 2.65001 16.7106C2.65001 12.7365 5.81925 9.5051 9.76015 9.4234Z" fill="#00F2EA"/></svg>';

const svgFace =
  '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_1_6)"><path d="M24 12C24 5.3726 18.6274 0 12 0C5.3726 0 0 5.3726 0 12C0 17.9894 4.38821 22.954 10.125 23.8542V15.4688H7.0781V12H10.125V9.35625C10.125 6.34875 11.9166 4.6875 14.6576 4.6875C15.9701 4.6875 17.3438 4.92188 17.3438 4.92188V7.875H15.8307C14.34 7.875 13.875 8.8001 13.875 9.75V12H17.2031L16.6711 15.4688H13.875V23.8542C19.6118 22.954 24 17.9894 24 12Z" fill="#1877F2"/></g><defs><clipPath id="clip0_1_6"><rect width="24" height="24" fill="white"/></clipPath></defs></svg>';

const options =
  '<option value="" hidden>How many followers do you have?</option><option value="0 - 1000">0 - 1000 </option><option value="1001 - 2500">1001 - 2500</option><option value="2501 - 5000">2501 - 5000</option><option value="5001 - 10000">5001 - 10000</option><option value="10001+">10000+</option>';

let idCounter = 0;
const createSocial = (name, svg) => {
  const social = document.createElement("div");
  const div = document.createElement("div");
  const button = document.createElement("button");
  button.innerHTML = svgButton;
  button.type = "button";
  const inputLabel = document.createElement("label");
  const selectLabel = document.createElement("label");
  const iconSpan = document.createElement("span");
  iconSpan.innerHTML = svg;
  iconSpan.classList.add("label-text");
  const input = document.createElement("input");
  addListener(input);
  input.setAttribute("required", "");
  input.setAttribute("placeholder", "Username (no @ or /)");
  input.setAttribute("social", name);
  const select = document.createElement("select");
  select.innerHTML = options;
  select.classList.add(`social-${name}`);
  select.id = `${name}-${idCounter}`;
  idCounter++;
  social.classList.add("social");
  social.appendChild(div);
  social.appendChild(button);
  div.appendChild(inputLabel);
  div.appendChild(selectLabel);
  inputLabel.appendChild(iconSpan);
  inputLabel.appendChild(input);
  selectLabel.appendChild(select);

  button.addEventListener("click", () => {
    if (document.querySelectorAll(".social").length > 1) social.remove();
  });

  return social;
};

socials.appendChild(createSocial("instagram", svgInsta));
const socialsElement = document.querySelector(".socials");

addInsta.addEventListener("click", () => {
  socials.appendChild(createSocial("instagram", svgInsta));
  socialsElement.scrollTop = socialsElement.scrollHeight;
});

addTikTok.addEventListener("click", () => {
  socials.appendChild(createSocial("tiktok", svgTikTok));
  socialsElement.scrollTop = socialsElement.scrollHeight;
});

addFacebook.addEventListener("click", () => {
  socials.appendChild(createSocial("facebook", svgFace));
  socialsElement.scrollTop = socialsElement.scrollHeight;
});

const validateForm = () => {
  const inputs = form.querySelectorAll("input");
  const selects = form.querySelectorAll("select");
  let isValid = true;
  inputs.forEach((input) => {
    if (!checkInput(input)) {
      isValid = false;
      input.classList.add("error");
    }
  });
  selects.forEach((select) => {
    if (select.value === "") {
      isValid = false;
      select.classList.add("error");
      select.addEventListener("change", () => {
        if (select.value !== "") {
          select.classList.remove("error");
        }
      });
    }
  });
  if (isValid) return true;
  return false;
};

const getValues = () => {
  const formFields = {};
  const formData = new FormData();
  const urlParams = new URLSearchParams(window.location.search);
  const utms = ["utm_source", "utm_medium", "utm_content", "gclid", "fbclid"];
  formData.append("$fields", ["Accepts-Marketing", ...utms]);
  formData.append("Accepts-Marketing", true);
  utms.forEach((urlParam) => {
    formData.append(urlParam, urlParams.get(urlParam));
  });
  formFields.first_name = document.querySelector("#first-name").value;
  formData.append("first_name", formFields.first_name);
  formFields.last_name = document.querySelector("#last-name").value;
  formData.append("last_name", formFields.last_name);
  formFields.email = document.querySelector("#email").value;
  formData.append("email", formFields.email);
  formFields.phone = document.querySelector("#phone").value;
  formData.append("phone_number", formFields.phone);
  formFields.password = document.querySelector("#password").value;
  formFields.address_1 = document.querySelector("#address1").value;
  formFields.address_2 = document.querySelector("#address2").value;
  formFields.city = document.querySelector("#city").value;
  formFields.postal_code = document.querySelector("#zip").value;
  formFields.country = document.querySelector("#country").value.split("-")[1];
  formFields.state = document.querySelector("#state").value;
  formFields.social_media_accounts = [];
  const socials = document.querySelectorAll(".social");
  socials.forEach((social) => {
    const socialObject = {};
    const input = social.querySelector("input");
    socialObject.network = input.getAttribute("social");
    socialObject.username = input.value;
    socialObject.followers = social.querySelector("select").value;
    formFields.social_media_accounts.push(socialObject);
  });
  return [formFields, formData];
};

const apiErrorField = document.querySelector(".api-error");

const postAmbassadors = async (body) => {
  const response = await fetch("https://www.buckedup.com/ambassador/register-ext/json", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  return response;
};

const postKlaviyo = async (formData, country) => {
  const getUrl = () => {
    const baseUrl = "https://manage.kmail-lists.com/ajax/subscriptions/subscribe?";
    switch (country) {
      case "US":
        return baseUrl + "a=Q7VQ35&g=Raq6VZ";
      case "AU":
        return baseUrl + "a=VGNvLD&g=X6vmmR";
      case "CA":
        return baseUrl + "a=XSvknt&g=VwqJMV";
      case "MX":
        return baseUrl + "a=&g=";
      case "GB":
        return baseUrl + "a=WhGrNj&g=UWBcqx";
    }
  };
  try {
    const response = await fetch(getUrl(), {
      method: "POST",
      body: formData,
    });
    if (!response.ok) {
      throw new Error("Klaviyo Network response was not ok: " + response.statusText);
    }
    const data = await response.json();
    if (!data.success) throw new Error("Error sending to klaviyo: " + data.errors);
    console.log(data);
  } catch (e) {
    console.warn(e);
  }
};

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const button = document.querySelector('button[type = "submit"]');
  const spinner = document.querySelector(".lds-dual-ring");
  button.toggleAttribute("disabled");
  spinner.classList.toggle("active");
  if (!validateForm()) {
    alert("Required field missing or invalid.");
    button.toggleAttribute("disabled");
    spinner.classList.toggle("active");
    return;
  }
  const [body, formData] = getValues();
  const country = document.querySelector("#country").value.split("-")[1];
  const urlParams = new URLSearchParams(window.location.search);
  body.parent_id = urlParams.get("pid");
  try {
    body.source = urlParams.get("source") || sourceField;
  } catch {
    body.source = urlParams.get("source") || "no-source-provided";
  }
  try {
    const [response, responseKlaviyo] = await Promise.all([postAmbassadors(body), postKlaviyo(formData, country)]);
    if (!response.ok) {
      const responseLog = await response.json();
      apiErrorField.classList.toggle("active");
      if (responseLog.error_code === "AlreadyAffiliate") responseLog.error_message = "The customer account is already associated with a ambassador application";
      apiErrorField.innerHTML = responseLog.error_message;
      button.toggleAttribute("disabled");
      spinner.classList.toggle("active");
      return;
    }
    window.location.href = `https://promo.buckedup.com/ambassador-thank-you?${urlParams}`;
  } catch (e) {
    apiErrorField.classList.toggle("active");
    apiErrorField.innerHTML = e.message === "Failed to fetch" ? "Oops! Something went wrong. Please check your connection." : e.message;
    button.toggleAttribute("disabled");
    spinner.classList.toggle("active");
  }
});
