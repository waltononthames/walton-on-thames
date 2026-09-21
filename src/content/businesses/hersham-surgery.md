---
name: "Hersham Surgery"
slug: "hersham-surgery"
category: "healthcare"
subcategories: ["gp-surgery"]
neighbourhood: "hersham"
address: "Pleasant Place, Hersham, Walton-on-Thames, Surrey, KT12 4HT"
lat: 51.3641
lng: -0.4000
phone: "01932 229033"
website: "https://www.hershamsurgery.nhs.uk/"
hours:
  mon: "8am–6:30pm"
  tue: "8am–6:30pm"
  wed: "8am–6:30pm"
  thu: "8am–6:30pm"
  fri: "8am–6:30pm"
  sat: "Closed"
  sun: "Closed"
description: "NHS GP practice on Pleasant Place, Hersham, near Hersham Green: opening times, registration links, parking as listed by the NHS, bus stops and nearby pharmacies."
images: []
featured: false
verified_date: "2026-09-21"
source: "Practice website (hershamsurgery.nhs.uk) and NHS profile (nhs.uk/services/gp-surgery/hersham-surgery/H81065), both checked 21 September 2026"
nhs_url: "https://www.nhs.uk/services/gp-surgery/hersham-surgery/H81065"
ods_code: "H81065"
checks:
  - fields: [name, address, phone, website, hours]
    source: &nhs
      label: "Hersham Surgery, NHS website profile"
      url: "https://www.nhs.uk/services/gp-surgery/hersham-surgery/H81065/contact-details-and-opening-times"
      basis: nhs-profile
      checked: "2026-09-21"
  - fields: [address, phone, hours]
    source: &surgery
      label: "Hersham Surgery website, Surgery details"
      url: "https://www.hershamsurgery.nhs.uk/our-surgeries/hersham-surgery/"
      basis: practice-website
      checked: "2026-09-21"
gp:
  ods_code: "H81065"
  nhs_url: "https://www.nhs.uk/services/gp-surgery/hersham-surgery/H81065"
  meta_title: "Hersham Surgery: contact, parking and visiting information"
  premises:
    name: "Hersham Surgery"
  building_point_source:
    label: "Map pin on the practice's NHS profile, matching the Hersham Surgery building on OpenStreetMap"
    url: "https://www.nhs.uk/services/gp-surgery/hersham-surgery/H81065/contact-details-and-opening-times"
    basis: nhs-profile
    checked: "2026-09-21"
  hours_source: *surgery
  hours_label: "Opening times"
  appointment_notes:
    - text: "The practice's website gives the same hours, 8am to 6:30pm on weekdays, for both reception and appointments."
      source: *surgery
  new_patients:
    statement: "The NHS website listed the practice as accepting new patients, and as accepting out-of-area registrations, when we checked."
    source:
      label: "NHS Find a GP, results for KT12 3LB"
      url: "https://www.nhs.uk/service-search/find-a-gp/"
      basis: nhs-profile
      checked: "2026-09-21"
  registration_note:
    text: "You can register online or on a paper form, which you can download or collect from the surgery and return by email or at reception."
    source: &register
      label: "Hersham Surgery website, Register as a patient"
      url: "https://www.hershamsurgery.nhs.uk/services/register-as-a-patient/"
      basis: practice-website
      checked: "2026-09-21"
  links:
    registration:
      url: "https://www.hershamsurgery.nhs.uk/services/register-as-a-patient/"
      label: "Registration information on the practice website"
      source: *register
    register_online:
      url: "https://gp-registration.nhs.uk/H81065"
      label: "Register online with the NHS"
      source: &howto
        label: "Hersham Surgery, NHS website: how to register"
        url: "https://www.nhs.uk/services/gp-surgery/hersham-surgery/H81065/how-to-register"
        basis: nhs-profile
        checked: "2026-09-21"
    catchment:
      url: "https://www.nhs.uk/services/gp-surgery/hersham-surgery/H81065/how-to-register"
      label: "Check your postcode against the catchment on the NHS website"
      source: *howto
    appointments:
      url: "https://www.hershamsurgery.nhs.uk/services/appointments/"
      label: "Appointments on the practice website"
      source:
        label: "Hersham Surgery website, Appointments"
        url: "https://www.hershamsurgery.nhs.uk/services/appointments/"
        basis: practice-website
        checked: "2026-09-21"
    repeat_prescriptions:
      url: "https://www.hershamsurgery.nhs.uk/services/order-a-repeat-prescription/"
      label: "Order a repeat prescription on the practice website"
      source: &rx
        label: "Hersham Surgery website, Order a repeat prescription"
        url: "https://www.hershamsurgery.nhs.uk/services/order-a-repeat-prescription/"
        basis: practice-website
        checked: "2026-09-21"
  nhs_facilities:
    items: ["Accessible toilets", "Bariatric equipment: weight support", "Disabled car parking", "Enhanced lighting", "Step-free access at entrances and exits", "Step-free access throughout", "Wheelchair access at entrances and exits", "Autism training for staff", "Disability awareness and equality training for staff", "Documents available in large print", "Hearing loop or induction loop", "Sign language interpreter available in person", "Sign language interpreter available online", "Text-to-speech and speech-to-text system", "Translation services", "Baby-changing facilities", "Parent and child parking spaces", "Free NHS WiFi", "Toilets", "Bus stop nearby", "Cycle parking", "Off-site car parking nearby", "Paid on-site car parking"]
    nhs_last_confirmed: "30 June 2026"
    source: &facilities
      label: "Hersham Surgery, NHS website: facilities"
      url: "https://www.nhs.uk/services/gp-surgery/hersham-surgery/H81065/facilities"
      basis: nhs-profile
      checked: "2026-09-21"
  visiting:
    - topic: parking
      text: "The practice's NHS profile, last confirmed by the practice on 30 June 2026, lists paid on-site car parking, off-site car parking nearby, disabled car parking, parent and child spaces and cycle parking. It doesn't give the charges, time limits or where the off-site parking is."
      source: *facilities
  bus_stops:
    - { name: "The Green", indicator: "near", street: "Burwood Road", atco: "40004405068D", distance_m: 130 }
    - { name: "The Green", indicator: "south-west bound", street: "Burwood Road", atco: "40004405068C", distance_m: 150 }
    - { name: "The Green", indicator: "adjacent", street: "Queens Road", atco: "40004405068B", distance_m: 220 }
    - { name: "The Green", indicator: "opposite", street: "Queens Road", atco: "40004405068A", distance_m: 250 }
  bus_stops_source:
    label: "Department for Transport, National Public Transport Access Nodes (NaPTAN), Surrey stops"
    url: "https://www.data.gov.uk/dataset/ff93ffc1-6656-47d8-9155-85ea0b8f2251/national-public-transport-access-nodes-naptan"
    basis: official-data
    checked: "2026-09-21"
  prescription_notes:
    - text: "The practice doesn't take repeat prescription requests by phone. You can order through its online form or the NHS App, or in person at the surgery."
      source: *rx
  prescription_box:
    statement: "The practice's website says that if you have a repeat prescription slip, you can drop it off at the prescription drop-in box. It doesn't say where the box is or when it can be reached."
    source: *rx
---

Hersham Surgery is an NHS GP practice on Pleasant Place in Hersham, about 110 metres in a straight line from the Hersham Green shops.
