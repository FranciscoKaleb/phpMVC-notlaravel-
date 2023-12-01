<?php

include "../models/SignUp.php";

class SignUpController
{

    public function showRegion($conn){

         $obj = new SignUp();
         $DBdata = $obj->getRegion($conn);

        return $DBdata;
    }

    public function showProvince($conn, $formData){

        $obj = new SignUp();
        $DBdata = $obj->getProvince($conn, $formData);

        return $DBdata;
    }

    public function showCity($conn, $formData){

        $obj = new SignUp();
        $DBdata = $obj->getCity($conn, $formData);

        return $DBdata;

    }
    public function showBrgy($conn, $formData){

        $obj = new SignUp();
        $DBdata = $obj->getBrgy($conn, $formData);

        return $DBdata;

    }

    public function chooseLevel($level, $conn, $formData){

        $SUCObj = new SignUpController();

        switch ($level) {

            case 'region':
                $DBdata = $SUCObj->showRegion($conn);
                break;

            case 'province':
                $regDesc = $formData["regDesc"];
                $DBdata = $SUCObj->showProvince($conn, $regDesc);
                break;

            case 'city':
                $provCode = $formData["provCode"];  
                $DBdata = $SUCObj->showCity($conn, $provCode);
                break;

            case 'brgy':
                $citymunCode = $formData["citymunCode"];
                $DBdata = $SUCObj->showBrgy($conn, $citymunCode);
                break;
            
            default:
                echo 'Invalid action.';
        }

        return $DBdata;
    }
}


?>
