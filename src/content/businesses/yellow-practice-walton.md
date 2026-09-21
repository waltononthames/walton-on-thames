---
name: "The Yellow Practice"
slug: "yellow-practice-walton"
category: "healthcare"
subcategories: ["gp-surgery"]
neighbourhood: "walton-on-thames"
address: "Walton Health Centre, Rodney Road, Walton-on-Thames, Surrey, KT12 3LB"
lat: 51.3809
lng: -0.4060
phone: "01932 506020"
website: "https://www.yellowpracticewalton.nhs.uk/"
hours:
  mon: "8:30am–6:30pm"
  tue: "8:30am–6:30pm"
  wed: "8:30am–6:30pm"
  thu: "8:30am–6:30pm"
  fri: "8:30am–6:30pm"
  sat: "Closed"
  sun: "Closed"
description: "The Yellow Practice is one of three separate NHS GP practices in Walton Health Centre on Rodney Road: opening times, registration links, bus stops and nearby pharmacies."
images: []
featured: false
verified_date: "2026-09-21"
source: "Practice website (yellowpracticewalton.nhs.uk) and NHS profile (nhs.uk/services/gp-surgery/the-yellow-practice/H81095), both checked 21 September 2026"
nhs_url: "https://www.nhs.uk/services/gp-surgery/the-yellow-practice/H81095"
ods_code: "H81095"
checks:
  - fields: [name, address, phone, hours]
    source: &nhs
      label: "The Yellow Practice, NHS website profile"
      url: "https://www.nhs.uk/services/gp-surgery/the-yellow-practice/H81095/contact-details-and-opening-times"
      basis: nhs-profile
      checked: "2026-09-21"
  - fields: [address, phone, website, hours]
    source: &surgery
      label: "The Yellow Practice website, Surgery details"
      url: "https://www.yellowpracticewalton.nhs.uk/our-surgeries/yellow-practice/"
      basis: practice-website
      checked: "2026-09-21"
gp:
  ods_code: "H81095"
  nhs_url: "https://www.nhs.uk/services/gp-surgery/the-yellow-practice/H81095"
  meta_title: "The Yellow Practice, Walton: contact, parking and visiting"
  premises:
    name: "Walton Health Centre"
    shared_with: ["red-practice-walton", "white-practice-walton"]
  building_point_source:
    label: "Map pin on the practice's NHS profile, matching the Walton Health Centre building outline on OpenStreetMap"
    url: "https://www.nhs.uk/services/gp-surgery/the-yellow-practice/H81095/contact-details-and-opening-times"
    basis: nhs-profile
    checked: "2026-09-21"
  hours_source: *surgery
  hours_label: "Opening times"
  new_patients:
    statement: "The NHS website listed the practice as accepting new patients when we checked."
    source:
      label: "NHS Find a GP, results for KT12 3LB"
      url: "https://www.nhs.uk/service-search/find-a-gp/"
      basis: nhs-profile
      checked: "2026-09-21"
  registration_note:
    text: "The practice says you usually have to live within its practice boundary to join, and links to a boundary map from its registration page. You can register online or on a paper form, which you can download or collect from the surgery."
    source: &register
      label: "The Yellow Practice website, Register as a patient"
      url: "https://www.yellowpracticewalton.nhs.uk/services/register-as-a-patient/"
      basis: practice-website
      checked: "2026-09-21"
  links:
    registration:
      url: "https://www.yellowpracticewalton.nhs.uk/services/register-as-a-patient/"
      label: "Registration information on the practice website"
      source: *register
    register_online:
      url: "https://gp-registration.nhs.uk/H81095"
      label: "Register online with the NHS"
      source: &howto
        label: "The Yellow Practice, NHS website: how to register"
        url: "https://www.nhs.uk/services/gp-surgery/the-yellow-practice/H81095/how-to-register"
        basis: nhs-profile
        checked: "2026-09-21"
    catchment:
      url: "https://www.nhs.uk/services/gp-surgery/the-yellow-practice/H81095/how-to-register"
      label: "Check your postcode against the catchment on the NHS website"
      source: *howto
    appointments:
      url: "https://www.yellowpracticewalton.nhs.uk/services/request-or-cancel-an-appointment/"
      label: "Request or cancel an appointment on the practice website"
      source:
        label: "The Yellow Practice website, Request or cancel an appointment"
        url: "https://www.yellowpracticewalton.nhs.uk/services/request-or-cancel-an-appointment/"
        basis: practice-website
        checked: "2026-09-21"
    repeat_prescriptions:
      url: "https://www.yellowpracticewalton.nhs.uk/services/order-a-repeat-prescription/"
      label: "Order a repeat prescription on the practice website"
      source: &rx
        label: "The Yellow Practice website, Order a repeat prescription"
        url: "https://www.yellowpracticewalton.nhs.uk/services/order-a-repeat-prescription/"
        basis: practice-website
        checked: "2026-09-21"
  nhs_facilities:
    items: ["Disabled parking", "Disabled toilet", "Induction loop", "Wheelchair access", "Step-free access", "Car parking", "Cycle parking"]
    nhs_last_confirmed: "19 July 2018"
    source:
      label: "The Yellow Practice, NHS website: facilities"
      url: "https://www.nhs.uk/services/gp-surgery/the-yellow-practice/H81095/facilities"
      basis: nhs-profile
      checked: "2026-09-21"
  visiting:
    - topic: parking
      text: "The practice's website lists car parking, cycle parking and disabled parking. It gives no charges, time limits or directions to the spaces."
      source: *surgery
  bus_stops:
    - { name: "Walton Hospital", indicator: "opposite", street: "Rodney Road", atco: "40004405263A", distance_m: 40 }
    - { name: "Walton Hospital", indicator: "outside", street: "Rodney Road", atco: "40004405263B", distance_m: 60 }
    - { name: "Rodney Green", indicator: "opposite", street: "Rodney Road", atco: "40004405093A", distance_m: 200 }
  bus_stops_source:
    label: "Department for Transport, National Public Transport Access Nodes (NaPTAN), Surrey stops"
    url: "https://www.data.gov.uk/dataset/ff93ffc1-6656-47d8-9155-85ea0b8f2251/national-public-transport-access-nodes-naptan"
    basis: official-data
    checked: "2026-09-21"
  prescription_notes:
    - text: "The practice doesn't take repeat prescription requests by phone. It points patients to the NHS App first, with an online form for those who can't use it, and you can also order in person at the surgery."
      source: *rx
  prescription_box:
    statement: "The practice's website says that if you have a repeat prescription slip, you can drop it off at the prescription drop-in box. It doesn't say where the box is or when it can be reached."
    source: *rx
---

The Yellow Practice is an NHS GP practice at Walton Health Centre on Rodney Road, Walton-on-Thames. It is one of three separate practices in the building, alongside The Red Practice and The White Practice, each with its own patient list and phone number.
