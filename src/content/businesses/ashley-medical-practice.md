---
name: "Ashley Medical Practice"
slug: "ashley-medical-practice"
category: "healthcare"
subcategories: ["gp-surgery"]
neighbourhood: "walton-on-thames"
address: "1A Crutchfield Lane, Walton-on-Thames, Surrey, KT12 2QY"
lat: 51.3807
lng: -0.4133
phone: "01932 252425"
website: "https://www.ashmed.co.uk/"
hours:
  mon: "8:30am–6pm"
  tue: "8:30am–6pm"
  wed: "8:30am–6pm"
  thu: "8:30am–6pm"
  fri: "8:30am–6pm"
  sat: "Closed"
  sun: "Closed"
description: "NHS GP practice on Crutchfield Lane, Walton-on-Thames: opening times, how appointments and repeat prescriptions work, registration links, bus stops and nearby pharmacies."
images: []
featured: false
verified_date: "2026-09-21"
source: "Practice website (ashmed.co.uk) and NHS profile (nhs.uk/services/gp-surgery/ashley-medical-practice/H81663), both checked 21 September 2026"
nhs_url: "https://www.nhs.uk/services/gp-surgery/ashley-medical-practice/H81663"
ods_code: "H81663"
checks:
  - fields: [name, address, phone, website]
    source: &nhs
      label: "Ashley Medical Practice, NHS website profile"
      url: "https://www.nhs.uk/services/gp-surgery/ashley-medical-practice/H81663/contact-details-and-opening-times"
      basis: nhs-profile
      checked: "2026-09-21"
  - fields: [address, phone, lat, lng]
    source: &contact
      label: "Ashley Medical Practice website, Contact us"
      url: "https://www.ashmed.co.uk/contact-us"
      basis: practice-website
      checked: "2026-09-21"
  - fields: [hours]
    source: &hoursrc
      label: "Ashley Medical Practice website, Opening hours"
      url: "https://www.ashmed.co.uk/opening-hours"
      basis: practice-website
      checked: "2026-09-21"
gp:
  ods_code: "H81663"
  nhs_url: "https://www.nhs.uk/services/gp-surgery/ashley-medical-practice/H81663"
  meta_title: "Ashley Medical Practice, Walton: contact and visiting"
  premises:
    name: "Ashley Medical Practice"
  building_point_source:
    label: "Map pin on the practice's own Contact us page. The NHS profile's pin is about 50 metres away, also at the western end of Crutchfield Lane."
    url: "https://www.ashmed.co.uk/contact-us"
    basis: practice-website
    checked: "2026-09-21"
  hours_source: *hoursrc
  hours_label: "Opening hours"
  hours_conflict: "The practice's website gives 8:30am to 6pm, Monday to Friday. Its NHS profile, last confirmed by the practice on 2 May 2025, gives reception hours of 8:45am to 6pm. We show the practice's own figures."
  appointment_notes:
    - text: "The practice says it works by appointment only and doesn't see walk-in patients. For an urgent same-day appointment it asks you to phone at 8:45am for the morning or at 2pm for the afternoon."
      source: &appts
        label: "Ashley Medical Practice website, Appointments"
        url: "https://www.ashmed.co.uk/appointments"
        basis: practice-website
        checked: "2026-09-21"
    - text: "Its opening hours page gives doctors' surgery times of 9:10am to 11am and, in a usual week, 3:20pm to 5:20pm, and says the nurses' times vary, so check with reception."
      source: *hoursrc
  new_patients:
    statement: "The NHS website listed the practice as accepting new patients when we checked."
    source:
      label: "NHS Find a GP, results for KT12 3LB"
      url: "https://www.nhs.uk/service-search/find-a-gp/"
      basis: nhs-profile
      checked: "2026-09-21"
  links:
    register_online:
      url: "https://gp-registration.nhs.uk/H81663/gpregistration/landing"
      label: "Register online with the NHS"
      source:
        label: "Ashley Medical Practice website, home page registration link"
        url: "https://www.ashmed.co.uk/"
        basis: practice-website
        checked: "2026-09-21"
    catchment:
      url: "https://www.nhs.uk/services/gp-surgery/ashley-medical-practice/H81663/how-to-register"
      label: "Check your postcode against the catchment on the NHS website"
      source:
        label: "Ashley Medical Practice, NHS website: how to register"
        url: "https://www.nhs.uk/services/gp-surgery/ashley-medical-practice/H81663/how-to-register"
        basis: nhs-profile
        checked: "2026-09-21"
    appointments:
      url: "https://www.ashmed.co.uk/appointments"
      label: "Appointments on the practice website"
      source: *appts
    repeat_prescriptions:
      url: "https://www.ashmed.co.uk/prescriptions-2"
      label: "Prescriptions on the practice website"
      source: &rx
        label: "Ashley Medical Practice website, Prescriptions"
        url: "https://www.ashmed.co.uk/prescriptions-2"
        basis: practice-website
        checked: "2026-09-21"
  nhs_facilities:
    items: ["Disabled toilet", "Wheelchair access", "Step-free access", "Car parking"]
    nhs_last_confirmed: "2 May 2025"
    source: &facilities
      label: "Ashley Medical Practice, NHS website: facilities"
      url: "https://www.nhs.uk/services/gp-surgery/ashley-medical-practice/H81663/facilities"
      basis: nhs-profile
      checked: "2026-09-21"
  visiting:
    - topic: parking
      text: "The practice's NHS profile lists car parking, last confirmed by the practice on 2 May 2025. It gives no charges, time limits or directions to the spaces, and lists no disabled parking."
      source: *facilities
  bus_stops:
    - { name: "Stompond Lane", indicator: "opposite", street: "Hersham Road", atco: "40004405049A", distance_m: 70 }
    - { name: "Stompond Lane", indicator: "adjacent", street: "Hersham Road", atco: "40004405049B", distance_m: 90 }
  bus_stops_source:
    label: "Department for Transport, National Public Transport Access Nodes (NaPTAN), Surrey stops"
    url: "https://www.data.gov.uk/dataset/ff93ffc1-6656-47d8-9155-85ea0b8f2251/national-public-transport-access-nodes-naptan"
    basis: official-data
    checked: "2026-09-21"
  prescription_notes:
    - text: "The practice asks for repeat prescriptions through the NHS App or the online form on its website, or by handing in the request slip from your last prescription at reception or posting it with a stamped addressed envelope. Admin staff can't take requests by phone. It says processing takes up to 48 working hours."
      source: *rx
---

Ashley Medical Practice is an NHS GP practice at 1A Crutchfield Lane, Walton-on-Thames.
