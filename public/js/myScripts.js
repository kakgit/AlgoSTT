function fnDeleteUserDetails()
{
    if(confirm("Are You Sure, You Want to Delete This User?"))
    {
        document.getElementById("frmDelUser").submit();
    }
}

function fnChangeModeDL(pThisObj)
{
    if(pThisObj.checked)
    {
        document.documentElement.setAttribute('data-bs-theme', 'dark');
    }
    else
    {
        document.documentElement.setAttribute('data-bs-theme', '');
    }
}