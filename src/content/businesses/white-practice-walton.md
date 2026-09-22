---
name: "The White Practice"
slug: "white-practice-walton"
category: "healthcare"
subcategories: ["gp-surgery"]
neighbourhood: "walton-on-thames"
address: "Walton Health Centre, Rodney Road, Walton-on-Thames, Surrey, KT12 3LB"
lat: 51.3809
lng: -0.4060
phone: "01932 558008"
website: "https://www.thewhitepractice.nhs.uk/"
hours:
  mon: "8am–6:30pm"
  tue: "8am–6:30pm"
  wed: "8am–6:30pm"
  thu: "8am–6:30pm"
  fri: "8am–6:30pm"
  sat: "Closed"
  sun: "Closed"
description: "The White Practice is one of three separate NHS GP practices in Walton Health Centre on Rodney Road: reception hours, registration links, parking, bus stops and nearby pharmacies."
images:
  - src: "/images/directory/walton-health-centre/walton-health-centre-main-entrance.webp"
    alt: "The main entrance to Walton Health Centre: glazed doors in a brick and white-panelled front, with NHS notice boards on the wall to the left"
    caption: "The main entrance to Walton Health Centre."
    role: entrance
    credit: "Darren Bayley / Walton-on-Thames.org"
    captured: "2026-09-06"
    width: 1200
    height: 900
  - src: "/images/directory/walton-health-centre/white-practice-prescription-box.webp"
    alt: "A dark wall-mounted box on red brickwork, labelled Dr S Morcos, White P. only, Prescription, beside the edge of the health centre's glazed entrance"
    caption: "The White Practice prescription box, to the right of the main entrance."
    role: prescription-box
    credit: "Darren Bayley / Walton-on-Thames.org"
    captured: "2026-09-06"
    width: 1000
    height: 750
  - src: "/images/directory/walton-health-centre/walton-health-centre-entrance-path.webp"
    alt: "A paved path leading between shrubs and a tall conifer to the glazed entrance of Walton Health Centre, with a blue handrail on the right"
    caption: "The path up to the entrance."
    role: step-free-route
    credit: "Darren Bayley / Walton-on-Thames.org"
    captured: "2026-09-06"
    width: 1200
    height: 900
  - src: "/images/directory/walton-health-centre/walton-health-centre-from-pavement.webp"
    alt: "The low brick Walton Health Centre building seen from the pavement across a grass verge, with a cycle stand in the foreground"
    caption: "Walton Health Centre from the pavement."
    role: exterior
    credit: "Darren Bayley / Walton-on-Thames.org"
    captured: "2026-09-06"
    width: 1200
    height: 900
  - src: "/images/directory/walton-health-centre/walton-health-centre-direction-sign.webp"
    alt: "A white sign with a blue arrow and the words Health Centre, standing in a planted verge beside the road"
    caption: "A Health Centre direction sign by the road."
    role: signage
    credit: "Darren Bayley / Walton-on-Thames.org"
    captured: "2026-09-06"
    width: 1000
    height: 750
  - src: "/images/directory/fort-house-surgery/walton-health-centre-car-park.webp"
    alt: "A wide, block-paved car park, empty apart from one car at the far left, edged by hedges with houses beyond"
    caption: "The Walton Health Centre car park, off Rodney Road."
    role: parking
    credit: "Darren Bayley / Walton-on-Thames.org"
    captured: "2026-09-06"
    width: 1200
    height: 900
featured: false
verified_date: "2026-09-21"
source: "Practice website (thewhitepractice.nhs.uk) and NHS profile (nhs.uk/services/gp-surgery/the-white-practice/H81131), both checked 21 September 2026"
nhs_url: "https://www.nhs.uk/services/gp-surgery/the-white-practice/H81131"
ods_code: "H81131"
checks:
  - fields: [name, address, phone, hours]
    source: &nhs
      label: "The White Practice, NHS website profile"
      url: "https://www.nhs.uk/services/gp-surgery/the-white-practice/H81131/contact-details-and-opening-times"
      basis: nhs-profile
      checked: "2026-09-21"
  - fields: [address, phone, website, hours]
    source: &surgery
      label: "The White Practice website, Surgery details"
      url: "https://www.thewhitepractice.nhs.uk/our-surgeries/dr-samy-morcos/"
      basis: practice-website
      checked: "2026-09-21"
gp:
  ods_code: "H81131"
  nhs_url: "https://www.nhs.uk/services/gp-surgery/the-white-practice/H81131"
  meta_title: "The White Practice, Walton: contact, parking and visiting"
  premises:
    name: "Walton Health Centre"
    shared_with: ["red-practice-walton", "yellow-practice-walton"]
  building_point_source:
    label: "Map pin on the practice's NHS profile, matching the Walton Health Centre building outline on OpenStreetMap"
    url: "https://www.nhs.uk/services/gp-surgery/the-white-practice/H81131/contact-details-and-opening-times"
    basis: nhs-profile
    checked: "2026-09-21"
  hours_source: *surgery
  hours_label: "Reception opening times"
  appointment_notes:
    - text: "The practice's website gives appointment times of 8:30am to 6:30pm, Monday to Friday, half an hour after reception opens."
      source: *surgery
  new_patients:
    statement: "The NHS website listed the practice as accepting new patients, and as accepting out-of-area registrations, when we checked."
    source:
      label: "NHS Find a GP, results for KT12 3LB"
      url: "https://www.nhs.uk/service-search/find-a-gp/"
      basis: nhs-profile
      checked: "2026-09-21"
  registration_note:
    text: "The practice says you usually have to live within its practice boundary to join, and links to a boundary map from its registration page. You can register online or on a paper form, which you can download or collect from the surgery."
    source: &register
      label: "The White Practice website, Register as a patient"
      url: "https://www.thewhitepractice.nhs.uk/services/register-as-a-patient/"
      basis: practice-website
      checked: "2026-09-21"
  links:
    registration:
      url: "https://www.thewhitepractice.nhs.uk/services/register-as-a-patient/"
      label: "Registration information on the practice website"
      source: *register
    register_online:
      url: "https://gp-registration.nhs.uk/H81131"
      label: "Register online with the NHS"
      source: &howto
        label: "The White Practice, NHS website: how to register"
        url: "https://www.nhs.uk/services/gp-surgery/the-white-practice/H81131/how-to-register"
        basis: nhs-profile
        checked: "2026-09-21"
    catchment:
      url: "https://www.nhs.uk/services/gp-surgery/the-white-practice/H81131/how-to-register"
      label: "Check your postcode against the catchment on the NHS website"
      source: *howto
    appointments:
      url: "https://www.thewhitepractice.nhs.uk/services/appointments/"
      label: "Appointments on the practice website"
      source:
        label: "The White Practice website, Appointments"
        url: "https://www.thewhitepractice.nhs.uk/services/appointments/"
        basis: practice-website
        checked: "2026-09-21"
    repeat_prescriptions:
      url: "https://www.thewhitepractice.nhs.uk/services/order-a-repeat-prescription/"
      label: "Order a repeat prescription on the practice website"
      source: &rx
        label: "The White Practice website, Order a repeat prescription"
        url: "https://www.thewhitepractice.nhs.uk/services/order-a-repeat-prescription/"
        basis: practice-website
        checked: "2026-09-21"
  nhs_facilities:
    items: ["Accessible toilets", "Disabled car parking", "Step-free access at entrances and exits", "Step-free access throughout", "Wheelchair access at entrances and exits", "Wheelchair access throughout", "Disability awareness and equality training for staff", "Documents available in Braille", "Documents available in large print", "Hearing loop or induction loop", "Sign language interpreter available in person", "Sign language interpreter available online", "Translation services", "Baby-changing facilities", "Parent and baby room", "Free NHS WiFi", "Toilets", "Bus stop nearby", "Free on-site car parking", "Train station nearby"]
    nhs_last_confirmed: "11 November 2025"
    source: &facilities
      label: "The White Practice, NHS website: facilities"
      url: "https://www.nhs.uk/services/gp-surgery/the-white-practice/H81131/facilities"
      basis: nhs-profile
      checked: "2026-09-21"
  visiting:
    - topic: entrance
      text: "Our photographs from 6 September 2026 show the health centre's main entrance: glazed doors at the end of a short paved path, with notice boards on the brick wall to their left. A white Health Centre sign with an arrow points the way from the road."
      source: &photos
        label: "Walton-on-Thames.org photographs of Walton Health Centre, 6 September 2026"
        basis: editor-observation
        checked: "2026-09-06"
    - topic: parking
      text: "The practice's NHS profile lists free on-site car parking and disabled car parking, last confirmed by the practice on 11 November 2025. It gives no time limits or directions to the spaces."
      source: *facilities
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
    location: "A dark wall-mounted box labelled \"Dr S Morcos, White P. only, Prescription\" is fixed to the brick wall to the right of the health centre's main entrance, seen in our photographs on 6 September 2026. The photograph shows the box is there; it can't show when it's emptied or whether it can be reached when the building is closed."
    location_source: *photos
---

The White Practice is an NHS GP practice at Walton Health Centre on Rodney Road, Walton-on-Thames. It is one of three separate practices in the building, alongside The Red Practice and The Yellow Practice, each with its own patient list and phone number.
