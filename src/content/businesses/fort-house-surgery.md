---
name: "Fort House Surgery"
slug: "fort-house-surgery"
category: "healthcare"
subcategories: ["gp-surgery"]
neighbourhood: "walton-on-thames"
address: "Walton Community Hospital, Rodney Road, Walton-on-Thames, Surrey, KT12 3LD"
lat: 51.3799
lng: -0.4064
phone: "01932 253055"
website: "https://www.forthousesurgery.nhs.uk/"
hours:
  mon: "8am–6:30pm"
  tue: "8am–6:30pm"
  wed: "8am–6:30pm"
  thu: "8am–6:30pm"
  fri: "8am–6:30pm"
  sat: "Closed"
  sun: "Closed"
description: "NHS GP practice at Walton Community Hospital on Rodney Road: address, phone, registration and repeat prescription links, bus stops and nearby pharmacies."
images:
  - src: "/images/directory/fort-house-surgery/fort-house-surgery-walton-on-thames-front.webp"
    alt: "Fort House Surgery's single-storey red-brick wing at Walton Community Hospital, with the FHS Fort House Surgery sign above the windows and a GP Surgery Parking Only sign by the hedge on the right"
    caption: "Fort House Surgery's own wing on the hospital site."
    role: exterior
    credit: "Darren Bayley / Walton-on-Thames.org"
    captured: "2026-09-06"
    width: 1200
    height: 900
  - src: "/images/directory/fort-house-surgery/fort-house-surgery-walton-on-thames-entrance.webp"
    alt: "Close view of the Fort House Surgery sign on the brick wall, with the glazed entrance door to its left and a No Entry sign in the hedge to the right"
    caption: "The glazed door to the left of the Fort House Surgery sign."
    role: entrance
    credit: "Darren Bayley / Walton-on-Thames.org"
    captured: "2026-09-06"
    width: 1200
    height: 900
  - src: "/images/directory/fort-house-surgery/fort-house-surgery-walton-on-thames-forecourt.webp"
    alt: "The block-paved forecourt and turning circle in front of the hospital buildings, with marked parking bays on the right"
    caption: "The forecourt in front of the hospital buildings."
    role: parking
    credit: "Darren Bayley / Walton-on-Thames.org"
    captured: "2026-09-06"
    width: 1200
    height: 900
  - src: "/images/directory/fort-house-surgery/fort-house-surgery-walton-community-hospital-from-road.webp"
    alt: "Walton Community Hospital seen from the road, with a canopied entrance on the left and the Fort House Surgery wing and its sign on the right"
    caption: "From the road: a canopied entrance on the left, and the Fort House Surgery wing on the right."
    role: exterior
    credit: "Darren Bayley / Walton-on-Thames.org"
    captured: "2026-09-06"
    width: 1200
    height: 900
  - src: "/images/directory/fort-house-surgery/walton-community-hospital-site-sign.webp"
    alt: "Blue and white NHS sign at the site entrance reading Thames Medical Locality Hub, Walton Community Hospital, with a red post box beside it"
    caption: "The sign at the site entrance."
    role: signage
    credit: "Darren Bayley / Walton-on-Thames.org"
    captured: "2026-09-06"
    width: 1200
    height: 900
featured: false
verified_date: "2026-09-21"
source: "Practice website (forthousesurgery.nhs.uk) and NHS profile (nhs.uk/services/gp-surgery/fort-house-surgery/H81020), both checked 21 September 2026"
nhs_url: "https://www.nhs.uk/services/gp-surgery/fort-house-surgery/H81020"
ods_code: "H81020"
checks:
  - fields: [name, address, phone, website]
    source: &nhs
      label: "Fort House Surgery, NHS website profile"
      url: "https://www.nhs.uk/services/gp-surgery/fort-house-surgery/H81020/contact-details-and-opening-times"
      basis: nhs-profile
      checked: "2026-09-21"
  - fields: [address, phone, hours]
    source: &contact
      label: "Fort House Surgery website, Contact us"
      url: "https://www.forthousesurgery.nhs.uk/contact-us/"
      basis: practice-website
      checked: "2026-09-21"
gp:
  ods_code: "H81020"
  nhs_url: "https://www.nhs.uk/services/gp-surgery/fort-house-surgery/H81020"
  meta_title: "Fort House Surgery, Walton: contact, parking and visiting"
  premises:
    name: "Walton Community Hospital"
    note: "Fort House Surgery is based at Walton Community Hospital. It is a separate site from Walton Health Centre, which is also on Rodney Road: the NHS gives the two different postcodes, KT12 3LD for Fort House and KT12 3LB for the health centre."
  building_point_source:
    label: "Centre of the Walton Community Hospital building outline on OpenStreetMap. The NHS profile pin sits at the building's eastern tip, and neither source says which part of the building the surgery occupies"
    url: "https://www.openstreetmap.org/relation/1241000"
    basis: openstreetmap
    checked: "2026-09-21"
  hours_source: *contact
  hours_label: "Reception opening times"
  appointment_notes:
    - text: "The practice asks patients to request appointments through its online form, Monday to Friday from 8am to 6:30pm. If you can't use the form, you can phone during those hours and the reception team will complete it for you."
      source: &appts
        label: "Fort House Surgery website, Appointments"
        url: "https://www.forthousesurgery.nhs.uk/services/appointments/"
        basis: practice-website
        checked: "2026-09-21"
  new_patients:
    statement: "The practice's registration page says its patient list is permanently open to all registrations, and the NHS website listed it as accepting new patients when we checked."
    source: &register
      label: "Fort House Surgery website, Register with the surgery"
      url: "https://www.forthousesurgery.nhs.uk/contact-us/register/"
      basis: practice-website
      checked: "2026-09-21"
  registration_note:
    text: "The practice asks you to check its catchment area before registering. If you can't register online, you can collect a paper form from reception between 1:30pm and 6pm. The practice says processing can take up to two weeks, and you stay registered with your previous practice until it texts to confirm."
    source: *register
  links:
    registration:
      url: "https://www.forthousesurgery.nhs.uk/contact-us/register/"
      label: "Registration information on the practice website"
      source: *register
    register_online:
      url: "https://gp-registration.nhs.uk/H81020"
      label: "Register online with the NHS"
      source: &howto
        label: "Fort House Surgery, NHS website: how to register"
        url: "https://www.nhs.uk/services/gp-surgery/fort-house-surgery/H81020/how-to-register"
        basis: nhs-profile
        checked: "2026-09-21"
    catchment:
      url: "https://www.nhs.uk/services/gp-surgery/fort-house-surgery/H81020/how-to-register"
      label: "Check your postcode against the catchment on the NHS website"
      source: *howto
    appointments:
      url: "https://www.forthousesurgery.nhs.uk/services/appointments/"
      label: "Appointments on the practice website"
      source: *appts
    repeat_prescriptions:
      url: "https://www.forthousesurgery.nhs.uk/services/prescriptions/"
      label: "Repeat prescriptions on the practice website"
      source: &rx
        label: "Fort House Surgery website, Prescriptions"
        url: "https://www.forthousesurgery.nhs.uk/services/prescriptions/"
        basis: practice-website
        checked: "2026-09-21"
  nhs_facilities:
    items: ["Disabled parking", "Disabled toilet", "Induction loop", "Wheelchair access", "Step-free access", "Baby changing facility", "Pram park", "Car parking", "Cycle parking"]
    nhs_last_confirmed: "13 December 2023"
    source:
      label: "Fort House Surgery, NHS website: facilities"
      url: "https://www.nhs.uk/services/gp-surgery/fort-house-surgery/H81020/facilities"
      basis: nhs-profile
      checked: "2026-09-21"
  visiting:
    - topic: entrance
      text: "Fort House Surgery has its own signed wing on the hospital site. Our photographs from 6 September 2026 show the FHS Fort House Surgery sign on the wall above the windows, with the glazed entrance door to its left. Seen from the road, the surgery wing is on the right, and a separate canopied entrance is on the left."
      source: &photos
        label: "Walton-on-Thames.org photographs of the site, 6 September 2026"
        basis: editor-observation
        checked: "2026-09-06"
    - topic: signage
      text: "A sign reading \"GP Surgery Parking Only\" stands by the hedge in front of the surgery wing (seen 6 September 2026). The sign at the site entrance names the site \"Thames Medical Locality Hub, Walton Community Hospital\" and says there are no accident and emergency services there, giving the nearest A&E as St Peter's Hospital, Chertsey."
      source: *photos
    - topic: accessible-parking
      text: "The practice says a designated disabled parking bay is next to the surgery entrance, and that the surgery has a ramp and wide doors for wheelchair access. It doesn't say where on the hospital site the entrance is."
      source: &access
        label: "Fort House Surgery website, Disabled access"
        url: "https://www.forthousesurgery.nhs.uk/about-section/disabled-access/"
        basis: practice-website
        checked: "2026-09-21"
    - topic: parking
      text: "The practice's contact page lists car parking, cycle parking and disabled parking. It gives no charges, time limits or directions to the spaces."
      source: *contact
    - topic: other
      text: "The practice's accessibility statement says it has audio induction loops and can arrange a British Sign Language interpreter if you contact it before your visit."
      source:
        label: "Fort House Surgery website, Accessibility statement"
        url: "https://www.forthousesurgery.nhs.uk/about-section/practice-policies/accessibility/"
        basis: practice-website
        checked: "2026-09-21"
  bus_stops:
    - { name: "Walton Hospital", indicator: "outside", street: "Rodney Road", atco: "40004405263B", distance_m: 50 }
    - { name: "Walton Hospital", indicator: "opposite", street: "Rodney Road", atco: "40004405263A", distance_m: 80 }
  bus_stops_source: &naptan
    label: "Department for Transport, National Public Transport Access Nodes (NaPTAN), Surrey stops"
    url: "https://www.data.gov.uk/dataset/ff93ffc1-6656-47d8-9155-85ea0b8f2251/national-public-transport-access-nodes-naptan"
    basis: official-data
    checked: "2026-09-21"
  prescription_notes:
    - text: "The practice doesn't take repeat prescription requests by phone or email. Besides the NHS App and its online form, you can fill in a request form at the reception desk, or bring a paper form in, Monday to Friday from 8am to 6:30pm. It asks you to allow up to 72 hours for a request to be processed."
      source: *rx
---

Fort House Surgery is an NHS GP practice at Walton Community Hospital on Rodney Road, Walton-on-Thames.
