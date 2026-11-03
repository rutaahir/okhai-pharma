from django.test import TestCase
from leads.pipeline.parser import parse_card_text

# 32 Realistic Pharma & Industrial B2B Business Card Samples
CARD_SAMPLES = [
    # --- Gujarat Pharma Industrial Corridor (1 to 10) ---
    {
        "text": """
        CADILA SYNTHETICS PVT LTD
        Dr. Rajesh V. Patel
        Managing Director
        Plot No. 4412/B, Phase IV, GIDC Industrial Estate
        Ankleshwar - 393002, Gujarat, INDIA
        Mob: +91 98250 12345 | Tel: 02646-250123
        Email: rajesh.patel@cadilasyn.com
        Web: www.cadilasyn.com
        GSTIN: 24AAACC1234F1Z5
        """,
        "expected_name": "Dr. Rajesh V. Patel",
        "expected_company": "CADILA SYNTHETICS PVT LTD",
        "expected_phone": "+919825012345",
        "expected_city": "Ankleshwar",
        "expected_pin": "393002",
        "expected_email": "rajesh.patel@cadilasyn.com"
    },
    {
        "text": """
        TORRENT INTERMEDIATES LTD
        Shri Amit K. Shah
        Director of Procurement
        Survey No. 128, Dahej PCPIR, Taluka Vagra
        Bharuch, Gujarat 392130
        M: +91 98795 67890 | Phone: +91 2641 267000
        amit.shah@torrentintermediates.co.in
        www.torrentintermediates.co.in
        """,
        "expected_name": "Shri Amit K. Shah",
        "expected_company": "TORRENT INTERMEDIATES LTD",
        "expected_phone": "+919879567890",
        "expected_city": "Bharuch",
        "expected_pin": "392130",
        "expected_email": "amit.shah@torrentintermediates.co.in"
    },
    {
        "text": """
        ZYDUS CHEMICALS & SOLVENTS
        Prakash Chandra Joshi
        Plant Head & General Manager
        GIDC Estate, Panoli - 394116
        Dist. Bharuch, Gujarat
        Contact: 09426123456
        prakash.joshi@zyduschem.org
        www.zyduschem.org
        """,
        "expected_name": "Prakash Chandra Joshi",
        "expected_company": "ZYDUS CHEMICALS & SOLVENTS",
        "expected_phone": "+919426123456",
        "expected_city": "Panoli",
        "expected_pin": "394116",
        "expected_email": "prakash.joshi@zyduschem.org"
    },
    {
        "text": """
        VAPI ORGANICS LLP
        Harshil N. Mehta
        Partner - Commercial Desk
        Plot 801, 3rd Phase, Vapi GIDC
        Valsad District, Gujarat - 396195
        Mob: +91 97240 55443
        harshil@vapiorganics.in
        www.vapiorganics.in
        GST: 24AABCV8899K1ZV
        """,
        "expected_name": "Harshil N. Mehta",
        "expected_company": "VAPI ORGANICS LLP",
        "expected_phone": "+919724055443",
        "expected_city": "Vapi",
        "expected_pin": "396195",
        "expected_email": "harshil@vapiorganics.in"
    },
    {
        "text": """
        BARODA SPECIALITY DRUGS LTD
        Mr. Vikramsingh Rathod
        Vice President - Exports
        Plot 52/A, Nandesari Industrial Area
        Vadodara - 391340, Gujarat
        Ph: +91 265 2840111 | M: +91 98240 99887
        vikram.rathod@barodadrugs.com
        www.barodadrugs.com
        """,
        "expected_name": "Mr. Vikramsingh Rathod",
        "expected_company": "BARODA SPECIALITY DRUGS LTD",
        "expected_phone": "+919824099887",
        "expected_city": "Vadodara",
        "expected_pin": "391340",
        "expected_email": "vikram.rathod@barodadrugs.com"
    },
    {
        "text": """
        OKHAI AGRO & LIFE SCIENCES
        Lakhaman Odedra
        Managing Partner
        National Highway 8B, Near GIDC
        Ranavav, Porbandar, Gujarat - 360550
        Phone: +91 99099 11223
        lokhai@okhaipharma.com
        www.okhaipharma.com
        """,
        "expected_name": "Lakhaman Odedra",
        "expected_company": "OKHAI AGRO & LIFE SCIENCES",
        "expected_phone": "+919909911223",
        "expected_pin": "360550",
        "expected_email": "lokhai@okhaipharma.com"
    },
    {
        "text": """
        SAURASHTRA BOTANICAL EXTRACTS
        Parth Visana
        Chief Technology Officer
        Plot 12, GIDC Industrial Estate
        Jamnagar - 361004, Gujarat
        Mob: +91 94280 88776
        parth.visana@saurashtraext.com
        www.saurashtraext.com
        """,
        "expected_name": "Parth Visana",
        "expected_company": "SAURASHTRA BOTANICAL EXTRACTS",
        "expected_phone": "+919428088776",
        "expected_city": "Jamnagar",
        "expected_pin": "361004",
        "expected_email": "parth.visana@saurashtraext.com"
    },
    {
        "text": """
        AHMEDABAD FORMULATIONS PVT LTD
        Satyen Chudasama
        Head of Quality Assurance
        Changodar Industrial Zone, Sarkhej Highway
        Ahmedabad - 382213, Gujarat
        Cell: +91 98980 44332
        satyen@ahmedabadformulations.com
        www.ahmedabadformulations.com
        """,
        "expected_name": "Satyen Chudasama",
        "expected_company": "AHMEDABAD FORMULATIONS PVT LTD",
        "expected_phone": "+919898044332",
        "expected_city": "Ahmedabad",
        "expected_pin": "382213",
        "expected_email": "satyen@ahmedabadformulations.com"
    },
    {
        "text": """
        SURAT FINE PHARMA LABS
        Dr. Meera N. Desai
        R&D Head & Scientist
        GIDC Sachin, Road No. 6
        Surat, Gujarat - 394230
        Tel: +91 261 2390111 | M: +91 98251 77665
        meera.desai@suratfinepharma.com
        www.suratfinepharma.com
        """,
        "expected_name": "Dr. Meera N. Desai",
        "expected_company": "SURAT FINE PHARMA LABS",
        "expected_phone": "+919825177665",
        "expected_city": "Surat",
        "expected_pin": "394230",
        "expected_email": "meera.desai@suratfinepharma.com"
    },
    {
        "text": """
        RAJKOT BULK DRUGS CORP
        Kishorebhai B. Patel
        Proprietor
        Aji GIDC Industrial Area, Phase II
        Rajkot - 360003, Gujarat
        Ph: 0281-2384500 | Mobile: +91 98242 11990
        info@rajkotbulkdrugs.co.in
        www.rajkotbulkdrugs.co.in
        """,
        "expected_name": "Kishorebhai B. Patel",
        "expected_company": "RAJKOT BULK DRUGS CORP",
        "expected_phone": "+919824211990",
        "expected_city": "Rajkot",
        "expected_pin": "360003",
        "expected_email": "info@rajkotbulkdrugs.co.in"
    },

    # --- Other Major Indian Industrial Hubs (11 to 20) ---
    {
        "text": """
        MAHARASHTRA BIO-SYNTHETICS LTD
        Mr. Sunil R. Kulkarni
        General Manager - Sourcing
        MIDC Tarapur, Boisar, Palghar
        Maharashtra - 401506
        Phone: +91 2525 271000 | Mob: +91 98200 45678
        sunil.kulkarni@mahabiosyn.com
        www.mahabiosyn.com
        """,
        "expected_name": "Mr. Sunil R. Kulkarni",
        "expected_company": "MAHARASHTRA BIO-SYNTHETICS LTD",
        "expected_phone": "+919820045678",
        "expected_pin": "401506",
        "expected_email": "sunil.kulkarni@mahabiosyn.com"
    },
    {
        "text": """
        HYDERABAD API LABS PVT LTD
        K. Venkat Reddy
        Commercial Director
        Genome Valley, Shamirpet
        Hyderabad, Telangana - 500078
        M: +91 98490 33221
        kvr@hydapilabs.com
        www.hydapilabs.com
        """,
        "expected_name": "K. Venkat Reddy",
        "expected_company": "HYDERABAD API LABS PVT LTD",
        "expected_phone": "+919849033221",
        "expected_city": "Hyderabad",
        "expected_pin": "500078",
        "expected_email": "kvr@hydapilabs.com"
    },
    {
        "text": """
        HIMACHAL REMEDIES & FORMULATIONS
        Er. Rakesh Sharma
        Plant Manager
        Baddi Industrial Area, Phase 1
        Solan, Himachal Pradesh - 173205
        Mobile: +91 94180 55443
        rakesh.sharma@himachalremedies.in
        www.himachalremedies.in
        """,
        "expected_name": "Er. Rakesh Sharma",
        "expected_company": "HIMACHAL REMEDIES & FORMULATIONS",
        "expected_phone": "+919418055443",
        "expected_city": "Baddi",
        "expected_pin": "173205",
        "expected_email": "rakesh.sharma@himachalremedies.in"
    },
    {
        "text": """
        CENTRAL PHARMA CHEMICALS
        Anand Mohan Verma
        Purchase Manager
        Sector 3, Pithampur Industrial Estate
        Indore, Madhya Pradesh - 454775
        Mob: +91 98260 77889
        anand.verma@centralpharmachem.com
        www.centralpharmachem.com
        """,
        "expected_name": "Anand Mohan Verma",
        "expected_company": "CENTRAL PHARMA CHEMICALS",
        "expected_phone": "+919826077889",
        "expected_city": "Indore",
        "expected_pin": "454775",
        "expected_email": "anand.verma@centralpharmachem.com"
    },
    {
        "text": """
        BANGALORE BIO-ACTIVE TECHNOLOGIES
        Dr. S. Radhakrishnan
        Chief Scientific Officer
        Electronic City, Phase 2, Hosur Road
        Bengaluru, Karnataka - 560100
        Direct: +91 80 28520000 | M: +91 98450 11998
        radhakrishnan@blrbiotech.com
        www.blrbiotech.com
        """,
        "expected_name": "Dr. S. Radhakrishnan",
        "expected_company": "BANGALORE BIO-ACTIVE TECHNOLOGIES",
        "expected_phone": "+919845011998",
        "expected_city": "Bengaluru",
        "expected_pin": "560100",
        "expected_email": "radhakrishnan@blrbiotech.com"
    },
    {
        "text": """
        MUMBAI BULK CHEMICALS LLP
        Farhan Merchant
        Partner - Global Sourcing
        Nariman Point, Marine Drive
        Mumbai, Maharashtra - 400021
        Ph: +91 22 22880000 | Cell: +91 98201 22334
        farhan@mumbaichem.com
        www.mumbaichem.com
        """,
        "expected_name": "Farhan Merchant",
        "expected_company": "MUMBAI BULK CHEMICALS LLP",
        "expected_phone": "+919820122334",
        "expected_city": "Mumbai",
        "expected_pin": "400021",
        "expected_email": "farhan@mumbaichem.com"
    },
    {
        "text": """
        PUNJAB ALKALOIDS & INTERMEDIATES
        Jaspreet Singh Sidhu
        Director
        Focal Point, Industrial Area
        Ludhiana, Punjab - 141010
        Contact: +91 98140 66778
        jaspreet.sidhu@punjabalkaloids.com
        www.punjabalkaloids.com
        """,
        "expected_name": "Jaspreet Singh Sidhu",
        "expected_company": "PUNJAB ALKALOIDS & INTERMEDIATES",
        "expected_phone": "+919814066778",
        "expected_pin": "141010",
        "expected_email": "jaspreet.sidhu@punjabalkaloids.com"
    },
    {
        "text": """
        VIZAG SPECIALITY APIS LTD
        B. Srinivasa Rao
        Head of Procurement
        Jawaharlal Nehru Pharma City, Parawada
        Visakhapatnam, Andhra Pradesh - 531021
        Mob: +91 98481 99001
        srinivas.b@vizagapis.com
        www.vizagapis.com
        """,
        "expected_name": "B. Srinivasa Rao",
        "expected_company": "VIZAG SPECIALITY APIS LTD",
        "expected_phone": "+919848199001",
        "expected_city": "Visakhapatnam",
        "expected_pin": "531021",
        "expected_email": "srinivas.b@vizagapis.com"
    },
    {
        "text": """
        DELHI PHARMA COMMERCE PVT LTD
        Vivek Singhania
        Managing Director
        Connaught Place, Barakhamba Road
        New Delhi, Delhi - 110001
        Tel: 011-23314455 | Mob: +91 98110 55667
        vivek@delhipharmacom.com
        www.delhipharmacom.com
        """,
        "expected_name": "Vivek Singhania",
        "expected_company": "DELHI PHARMA COMMERCE PVT LTD",
        "expected_phone": "+919811055667",
        "expected_pin": "110001",
        "expected_email": "vivek@delhipharmacom.com"
    },
    {
        "text": """
        CHENNAI CHEMICAL REAGENTS
        Mrs. Ananya Sundaram
        Commercial Manager
        SIPCOT Industrial Complex, Gummidipoondi
        Chennai, Tamil Nadu - 601201
        Phone: +91 44 27920000 | M: +91 98400 33445
        ananya@chennaicr.com
        www.chennaicr.com
        """,
        "expected_name": "Mrs. Ananya Sundaram",
        "expected_company": "CHENNAI CHEMICAL REAGENTS",
        "expected_phone": "+919840033445",
        "expected_city": "Chennai",
        "expected_pin": "601201",
        "expected_email": "ananya@chennaicr.com"
    },

    # --- International B2B Card Samples (21 to 32) ---
    {
        "text": """
        APEX PHARMACEUTICAL TRADING INC
        Johnathan M. Miller
        Executive Director - Global Supply
        100 Wall Street, 18th Floor
        New York, NY 10005, USA
        Phone: +1 212 555 0199
        j.miller@apexpharmatrading.com
        www.apexpharmatrading.com
        """,
        "expected_name": "Johnathan M. Miller",
        "expected_company": "APEX PHARMACEUTICAL TRADING INC",
        "expected_phone": "+12125550199",
        "expected_email": "j.miller@apexpharmatrading.com"
    },
    {
        "text": """
        BAVARIA FINE CHEMICALS GMBH
        Dr. Hans Peter Weber
        Director of API Procurement
        Leopoldstrasse 230
        80807 Munich, Germany
        Tel: +49 89 2444000 | Mob: +49 171 1234567
        hans.weber@bavariachem.de
        www.bavariachem.de
        """,
        "expected_name": "Dr. Hans Peter Weber",
        "expected_company": "BAVARIA FINE CHEMICALS GMBH",
        "expected_phone": "+491711234567",
        "expected_email": "hans.weber@bavariachem.de"
    },
    {
        "text": """
        SWISS LIFE SCIENCES SOLUTIONS AG
        Marc Zimmerman
        Chief Executive Officer
        Grenzacherstrasse 124
        4058 Basel, Switzerland
        Office: +41 61 688 1111 | Mobile: +41 79 123 4567
        m.zimmerman@swisslifesci.ch
        www.swisslifesci.ch
        """,
        "expected_name": "Marc Zimmerman",
        "expected_company": "SWISS LIFE SCIENCES SOLUTIONS AG",
        "expected_phone": "+41791234567",
        "expected_email": "m.zimmerman@swisslifesci.ch"
    },
    {
        "text": """
        LONDON PHARMA CONTRACTS LTD
        Arthur Pendelton
        Procurement Head
        45 Moorgate, Financial District
        London EC2R 6BH, United Kingdom
        Direct: +44 20 7946 0991
        a.pendelton@londonpharma.co.uk
        www.londonpharma.co.uk
        """,
        "expected_name": "Arthur Pendelton",
        "expected_company": "LONDON PHARMA CONTRACTS LTD",
        "expected_phone": "+442079460991",
        "expected_email": "a.pendelton@londonpharma.co.uk"
    },
    {
        "text": """
        GULF LIFE CHEMICALS FZ-LLC
        Tariq Al-Mansoor
        Managing Director
        Dubai Science Park, Towers Complex
        Dubai, United Arab Emirates
        Phone: +971 4 391 0000 | Mob: +971 50 123 4567
        tariq@gulflifechem.ae
        www.gulflifechem.ae
        """,
        "expected_name": "Tariq Al-Mansoor",
        "expected_company": "GULF LIFE CHEMICALS FZ-LLC",
        "expected_phone": "+971501234567",
        "expected_email": "tariq@gulflifechem.ae"
    },
    {
        "text": """
        SINGAPORE APIS & PHARMA PTE LTD
        Wei Chen
        Senior Sourcing Manager
        10 Biopolis Way, Nucleos Building
        Singapore 138670
        Tel: +65 6778 0000 | Cell: +65 9123 4567
        wei.chen@sgapis.com.sg
        www.sgapis.com.sg
        """,
        "expected_name": "Wei Chen",
        "expected_company": "SINGAPORE APIS & PHARMA PTE LTD",
        "expected_phone": "+6591234567",
        "expected_email": "wei.chen@sgapis.com.sg"
    },
    {
        "text": """
        TOKYO BOTANICAL EXTRACTS CORP
        Kenji Takahashi
        Import Director
        1-2-3 Marunouchi, Chiyoda-ku
        Tokyo 100-0005, Japan
        Phone: +81 3 3210 0000 | Mob: +81 90 1234 5678
        k.takahashi@tokyobotanical.jp
        www.tokyobotanical.jp
        """,
        "expected_name": "Kenji Takahashi",
        "expected_company": "TOKYO BOTANICAL EXTRACTS CORP",
        "expected_phone": "+819012345678",
        "expected_email": "k.takahashi@tokyobotanical.jp"
    },
    {
        "text": """
        PARIS PHARMA INGREDIENTS SAS
        Claire Dubois
        Directrice Commerciale
        Boulevard Saint-Germain 150
        75006 Paris, France
        Tel: +33 1 42 68 00 00 | Portable: +33 6 12 34 56 78
        claire.dubois@paris-pharma.fr
        www.paris-pharma.fr
        """,
        "expected_name": "Claire Dubois",
        "expected_company": "PARIS PHARMA INGREDIENTS SAS",
        "expected_phone": "+33612345678",
        "expected_email": "claire.dubois@paris-pharma.fr"
    },
    {
        "text": """
        ROTTERDAM BULK SOLVENTS BV
        Lars Van Der Berg
        Managing Partner
        Weena 505, Business Plaza
        3013 AL Rotterdam, Netherlands
        Ph: +31 10 404 0000 | Mob: +31 6 12345678
        lars@rotterdambulk.nl
        www.rotterdambulk.nl
        """,
        "expected_name": "Lars Van Der Berg",
        "expected_company": "ROTTERDAM BULK SOLVENTS BV",
        "expected_phone": "+31612345678",
        "expected_email": "lars@rotterdambulk.nl"
    },
    {
        "text": """
        BRASIL FARMA DISTRIBUIDORA LTDA
        Rodrigo Silva Santos
        Diretor de Importação
        Av. Paulista, 1000 - Bela Vista
        São Paulo - SP, 01310-100, Brazil
        Tel: +55 11 3254 0000 | Cel: +55 11 98765 4321
        rodrigo.santos@brasilfarma.com.br
        www.brasilfarma.com.br
        """,
        "expected_name": "Rodrigo Silva Santos",
        "expected_company": "BRASIL FARMA DISTRIBUIDORA LTDA",
        "expected_phone": "+5511987654321",
        "expected_email": "rodrigo.santos@brasilfarma.com.br"
    },
    {
        "text": """
        SYDNEY CHEMICAL IMPORTS PTY LTD
        Liam O'Connor
        Managing Director
        Level 24, 100 George Street
        Sydney NSW 2000, Australia
        Ph: +61 2 9250 0000 | Mob: +61 412 345 678
        liam@sydneychem.com.au
        www.sydneychem.com.au
        """,
        "expected_name": "Liam O'Connor",
        "expected_company": "SYDNEY CHEMICAL IMPORTS PTY LTD",
        "expected_phone": "+61412345678",
        "expected_email": "liam@sydneychem.com.au"
    },
    {
        "text": """
        CAPE TOWN HEALTH INGREDIENTS
        Pieter Van Zyl
        Head of Procurement
        Century City, Long Walk 15
        Cape Town, 7441, South Africa
        Tel: +27 21 550 0000 | Mob: +27 82 123 4567
        pieter@capetownhealth.co.za
        www.capetownhealth.co.za
        """,
        "expected_name": "Pieter Van Zyl",
        "expected_company": "CAPE TOWN HEALTH INGREDIENTS",
        "expected_phone": "+27821234567",
        "expected_email": "pieter@capetownhealth.co.za"
    }
]

class CardExtractionAccuracyTests(TestCase):
    def test_32_card_samples_accuracy_benchmark(self):
        """
        Runs the full parser on all 32 realistic card samples and verifies
        field extraction accuracy metrics (> 90% accuracy target).
        """
        total = len(CARD_SAMPLES)
        correct_names = 0
        correct_companies = 0
        correct_phones = 0
        correct_emails = 0
        correct_pins = 0

        print(f"\n=======================================================")
        print(f"BENCHMARKING EXTRACTION ACCURACY ON {total} CARD SAMPLES")
        print(f"=======================================================")

        for idx, sample in enumerate(CARD_SAMPLES):
            res = parse_card_text(sample["text"])

            # 1. Phone match check
            extracted_phones = [p["e164"] for p in res["phones"]]
            has_expected_phone = sample["expected_phone"] in extracted_phones or any(
                sample["expected_phone"][-8:] in p for p in extracted_phones
            )
            if has_expected_phone:
                correct_phones += 1

            # 2. Name match check
            name_tokens = sample["expected_name"].lower().split()
            extracted_name_lower = res["name"].lower()
            if any(t in extracted_name_lower for t in name_tokens if len(t) > 3):
                correct_names += 1

            # 3. Company match check
            company_tokens = sample["expected_company"].lower().split()
            extracted_comp_lower = res["company"].lower()
            if any(t in extracted_comp_lower for t in company_tokens if len(t) > 3):
                correct_companies += 1

            # 4. Email check
            if sample.get("expected_email"):
                if sample["expected_email"].lower() in [e.lower() for e in res["emails"]]:
                    correct_emails += 1

            # 5. PIN / City check
            if sample.get("expected_pin"):
                if sample["expected_pin"] in res["address_raw"] or res["address_components"].get("postal_code") == sample["expected_pin"]:
                    correct_pins += 1

        phone_acc = (correct_phones / total) * 100
        name_acc = (correct_names / total) * 100
        comp_acc = (correct_companies / total) * 100
        email_acc = (correct_emails / total) * 100

        print(f"PHONE ACCURACY:      {phone_acc:.1f}% ({correct_phones}/{total})")
        print(f"NAME ACCURACY:       {name_acc:.1f}% ({correct_names}/{total})")
        print(f"COMPANY ACCURACY:    {comp_acc:.1f}% ({correct_companies}/{total})")
        print(f"EMAIL ACCURACY:      {email_acc:.1f}% ({correct_emails}/{total})")
        print(f"=======================================================\n")

        # Assert accuracy thresholds
        self.assertGreaterEqual(phone_acc, 90.0, "Phone extraction accuracy below 90%")
        self.assertGreaterEqual(name_acc, 90.0, "Name extraction accuracy below 90%")
        self.assertGreaterEqual(comp_acc, 90.0, "Company extraction accuracy below 90%")
        self.assertGreaterEqual(email_acc, 90.0, "Email extraction accuracy below 90%")

